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
  nameForContent,
  isolateNotes,
  removeNotes,
  MOD_REG
} = helpers;

const SLIDE_REG = /\n---\n/;

const SLIDE_TYPE = 'Slide';
const NOTES_TYPE = 'Notes';

module.exports = async function(src) {
  const { data, content } = matter(src);

  const inlineModules = [];

  const callback = this.async();
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath
  });

  const separatedContent = normalizeNewline(content)
    .replace(MOD_REG, (value, group1) => {
      if (!group1) {
        // group1 is empty, so this is not the import/export case we're looking for
        return value;
      } else {
        // found an inline export or import statement
        inlineModules.push(value);
        return '';
      }
    })
    .split(SLIDE_REG);

  const slides = separatedContent
    .map(removeNotes)
    .map(content => addInlineModules(content, inlineModules))
    .map(content => sync(content, options))
    .map(removeDefaultExport)
    .map(removeInlineModules)
    .map(trim)
    .map((content, index) => wrapComponent(content, index, SLIDE_TYPE));

  const notes = separatedContent
    .map(isolateNotes)
    .map(content => addInlineModules(content, inlineModules))
    .map(content => sync(content, options))
    .map(removeDefaultExport)
    .map(removeInlineModules)
    .map(trim)
    .map((content, index) => wrapComponent(content, index, NOTES_TYPE));

  const { modules = [] } = data;
  const slideWrapperNames = [];
  const noteWrapperNames = [];

  let allCode = `/* @jsx mdx */
import React from 'react'
import { mdx } from '@mdx-js/react'
${modules.join('\n')}
${inlineModules
  .filter(function(el, i, arr) {
    return arr.indexOf(el) === i;
  })
  .join('\n')}\n\n`;

  slides.forEach((s, i) => {
    allCode += s + '\n\n';
    slideWrapperNames.push(nameForContent(i, SLIDE_TYPE));
  });

  notes.forEach((n, i) => {
    allCode += n + '\n\n';
    noteWrapperNames.push(nameForContent(i, NOTES_TYPE));
  });

  const footer = `
export const notes = [${noteWrapperNames}];\n\n
export default [${slideWrapperNames}]`;
  allCode += footer;

  return callback(null, allCode);
};
