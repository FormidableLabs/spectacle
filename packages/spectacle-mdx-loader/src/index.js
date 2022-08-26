'use strict';

const { getOptions } = require('loader-utils');
const matter = require('gray-matter');
const normalizeNewline = require('normalize-newline');

const helpers = require('./helpers');
const {
  wrapComponent,
  trim,
  removeInlineModules,
  removeDefaultExport,
  sync,
  addInlineModules,
  nameForComponent,
  isolateNotes,
  removeNotes,
  MOD_REG
} = helpers;

const SLIDE_REG = /\n---\n/;

const SLIDE_TYPE = 'Slide';
const NOTES_TYPE = 'Notes';

// eslint-disable-next-line max-statements
module.exports = async function(src) {
  const { data, content } = matter(src);

  const inlineModules = [];

  const callback = this.async();
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath
  });

  const separatedContent = normalizeNewline(content)
    /*
     * Set aside all inline JSX import and export statements from the MDX file.
     * When mdx.sync() compiles MDX into JSX, it will stub any component that doesn't
     * have a corresponding import. Therefore, we will re-add all of the imports/exports
     * to each slide before compiling the MDX via mdx.sync().
     */
    .replace(MOD_REG, (value, group1) => {
      if (!group1) {
        // group1 is empty, so this is not the import/export case we're looking for
        return value;
      }
      // found an inline export or import statement
      inlineModules.push(value);
      return '';
    })
    /*
     * Split the MDX file by occurences of `---`. This is a reserved symbol
     * to denote slide boundaries.
     */
    .split(SLIDE_REG);

  /*
   * Process the content and generate an array of slide components
   */
  const slides = separatedContent
    .map(removeNotes)
    .map(mdxContent => addInlineModules(mdxContent, inlineModules))
    .map(mdxContent => sync(mdxContent, options))
    .map(removeDefaultExport)
    .map(removeInlineModules)
    .map(trim)
    .map((mdxContent, index) => wrapComponent(mdxContent, index, SLIDE_TYPE));

  /*
   * Process the content and generate an array of notes components
   */
  const notes = separatedContent
    .map(isolateNotes)
    .map(mdxContent => addInlineModules(mdxContent, inlineModules))
    .map(mdxContent => sync(mdxContent, options))
    .map(removeDefaultExport)
    .map(removeInlineModules)
    .map(trim)
    .map((mdxContent, index) => wrapComponent(mdxContent, index, NOTES_TYPE));

  const { modules = [] } = data;
  const slideWrapperNames = [];
  const noteWrapperNames = [];

  /*
   * Begin composing the final output. Include React, mdx, modules, and the inline
   * export/import statements that we removed in Step 6.
   */
  let allCode = `/* @jsx mdx */
import React from 'react'
import { mdx } from '@mdx-js/react'
${modules.join('\n')}
${inlineModules
  .filter((el, i, arr) => {
    return arr.indexOf(el) === i;
  })
  .join('\n')}\n\n`;

  /*
   * Add in the slide component definitions. Keep track of the component names.
   */
  slides.forEach((s, i) => {
    allCode += `${s}\n\n`;
    slideWrapperNames.push(nameForComponent(i, SLIDE_TYPE));
  });

  /*
   * Add in the notes component definitions. Keep track of the component names.
   */
  notes.forEach((n, i) => {
    allCode += `${n}\n\n`;
    noteWrapperNames.push(nameForComponent(i, NOTES_TYPE));
  });

  /*
   * Finally, declare the default export as an array of the slide components.
   * See /examples/mdx/for how to import and use the generated slide components.
   */
  const footer = `
export const notes = [${noteWrapperNames}];\n\n
export default [${slideWrapperNames}]`;
  allCode += footer;

  return callback(null, allCode);
};
