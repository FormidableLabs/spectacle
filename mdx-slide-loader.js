const { getOptions } = require('loader-utils');
const mdx = require('@mdx-js/mdx');
const matter = require('gray-matter');
const normalizeNewline = require('normalize-newline');

const EXREG = /export\sdefault\s/g;
const MODREG = /^(import|export)\s/g;
const SLIDEREG = /\n---\n/;
const CODEBLOCKREG = /(`{3})(?:(?=(\\?))\2[\s\S])*?\1/g;
const INLINECODEREG = /(`{1})(?:(?=(\\?))\2.)*?\1/g;
const SNIPPETREG = /SPECTACLE-CODE-SNIPPET-\d/g;

const nameForSlide = index => `MDXContentWrapper${index}`;
const codeSnippetPlaceholder = index => `SPECTACLE-CODE-SNIPPET-${index}`;

module.exports = async function(src) {
  const { data, content } = matter(src);

  const inlineModules = [];
  const codeSnippets = {};
  let codeSnippetCounter = 0;

  const callback = this.async();
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath
  });

  /*
   Step 1:
   * Replace all code blocks and inline code with a temporary string.
   * This prevents the next step from accidentally pulling `import` or `export`
   * statements out of the code snippets (which would later break the JSX with
   * duplicate import statements). We look for pairs of (```) before pairs of
   * (`) so that we don't mismatch code block back ticks.
   */
  const contentWithoutCodeSnippets = normalizeNewline(content)
    .replace(CODEBLOCKREG, codeBlock => {
      const placeholderString = codeSnippetPlaceholder(codeSnippetCounter);
      codeSnippets[placeholderString] = codeBlock;
      codeSnippetCounter++;
      return placeholderString;
    })
    .replace(INLINECODEREG, inlineCode => {
      const placeholderString = codeSnippetPlaceholder(codeSnippetCounter);
      codeSnippets[placeholderString] = inlineCode;
      codeSnippetCounter++;
      return placeholderString;
    });

  const slides = contentWithoutCodeSnippets
    .split('\n')
    /*
     Step 2: 
     * Set aside all inline JSX import and export statements from the MDX file.
     * When mdx.sync() compiles MDX into JSX, it will stub any component that doesn't
     * have a corresponding import. Therefore, we will re-add all of the imports/exports
     * to each slide before compiling the MDX via mdx.sync().
     */
    .map(line => {
      if (MODREG.test(line)) {
        inlineModules.push(line);
      }
      return line;
    })
    .filter(line => !MODREG.test(line))
    .join('\n')
    /*
     Step 3:
     * We can now safely put back the code snippets. This is important to do
     * before compiling the MDX.
     */
    .replace(SNIPPETREG, placeholderString => {
      const codeSnippet = codeSnippets[placeholderString];
      return codeSnippet;
    })
    /* 
     Step 4:
     * Split the MDX file by occurences of `---`. This is a reserved symbol
     * to denote slide boundaries.
     */
    .split(SLIDEREG)
    /*
     Step 5:
     * As referenced before, we need to add the imports and exports to
     * every slide again. That way mdx.sync can find the component definitions
     * for any custom components used in the MDX file.
     */
    .map(
      slide => `
${inlineModules.join('\n')}\n
${slide}`
    )
    /*
     Step 6:
     * Use mdx.sync to compile a separate JSX component for each slide
     * written in MDX.
     */
    .map(slide => mdx.sync(slide, options))
    /*
     Step 7:
     * mdx.sync will attempt to default export the component generated for each
     * slide. However, we have multiple slides and thus multiple generated components.
     * We can't export multiple defaults, so we must remove all existing occurences of
     * `export default`.
     */
    .map(slide => slide.replace(EXREG, ''))
    /*
     Step 8:
     * Remove the inline exports/imports again. We don't want to duplicate import/export
     * statements littered throughout the file output.
     */
    .map(slide =>
      slide
        .split('\n')
        .filter(line => !MODREG.test(line))
        .filter(Boolean)
        .join('\n')
    )
    .map(slide => slide.trim())
    /*
     Step 9:
     * The generated component from mdx.sync assumes it's the only component that
     * will inhabit a file. It has const definitions outside of the auto-named MDXContent
     * component. This would be fine if we weren't generating a component for each
     * slide. However, in our case we would generate a lot of duplicate variable names.
     * Thus, the easiest solution is to wrap each mdx.sync-generated component+const
     * definitions in another component that is uniquely named (using slide index).
     */
    .map((slide, i) => {
      const wrapperName = nameForSlide(i);
      return `function ${wrapperName}(props) {
  ${slide}
  return (<MDXContent {...props} />);
};
${wrapperName}.isMDXComponent = true;`;
    });

  const { modules = [] } = data;
  let wrapperNames = [];
  /*
   Step 10:
   * Begin composing the final output. Include React, mdx, modules, and the inline
   * export/import statements that we removed in Step 8.
   */
  let allCode = `/* @jsx mdx */
import React from 'react'
import { mdx } from '@mdx-js/react'
${modules.join('\n')}
${inlineModules
  .filter(function(el, i, arr) {
    return arr.indexOf(el) === i;
  })
  .join('\n')}\n\n`;
  /*
   Step 11:
   * Add in the slide component definitions. Keep track of the component names.
   */
  slides.forEach((s, i) => {
    allCode += s + '\n\n';
    wrapperNames.push(nameForSlide(i));
  });
  /*
   Step 12:
   * Finally, declare the default export as an array of the slide components.
   * See /examples/mdx/test-mdx.js for how to import and use the generated slide
   * components.
   */
  const footer = `export const slideCount = ${slides.length};\n\n
export default [${wrapperNames}]`;
  allCode += footer;

  return callback(null, allCode);
};
