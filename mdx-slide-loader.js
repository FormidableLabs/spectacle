const { getOptions } = require('loader-utils');
const mdx = require('@mdx-js/mdx');
const matter = require('gray-matter');
const normalizeNewline = require('normalize-newline');

const EXREG = /export\sdefault\s/g;
const MODREG = /^(import|export)\s/;
const SLIDEREG = /\n---\n/;

const nameForSlide = index => `MDXContentWrapper${index}`;

module.exports = async function(src) {
  const { data, content } = matter(src);

  const inlineModules = [];

  const callback = this.async();
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath
  });

  /*
  Step 1: 
  * Set aside all inline import and export statements from the mdx file.
  * When mdx.sync compiles MDX into JSX, it will stub any component that doesn't have a corresponding
  * import. Therefore, we will re-add all of the imports/exports to each 
  * slide (then remove and add them again!).
  */
  const slides = normalizeNewline(content)
    .split('\n')
    .map(line => {
      if (MODREG.test(line)) {
        inlineModules.push(line);
      }
      return line;
    })
    .filter(line => !MODREG.test(line))
    .filter(Boolean)
    .join('\n')
    /* 
    Step 2:
    * Split the MDX file by occurences of `---`. This is a reserved symbol
    * to denote slide boundaries.
    */
    .split(SLIDEREG)
    /*
    Step 3:
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
    Step 4:
    * Use mdx.sync to compile a separate JSX component for each slide
    * written in MDX.
    */
    .map(slide => mdx.sync(slide, options))
    /*
    Step 5:
    * mdx.sync will attempt to default export the component generated for each
    * slide. However, we have multiple slides and thus multiple generated components.
    * We can't export multiple defaults, so we must remove all existing occurences of
    * `export default`.
    */
    .map(slide => slide.replace(EXREG, ''))
    /*
    Step 6:
    * Remove the inline exports/imports again. We don't want duplicate import/export
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
    Step 7:
    * The generate component from mdx.sync assumes it's the only component that
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
  Step 8:
  * Begin composing the final output. Include React, mdx, modules, and the inline
  * export/import statements that we removed in Step 6.
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
  Step 9:
  * Add in the slide component definitions. Keep track of the component names.
  */
  slides.forEach((s, i) => {
    allCode += s + '\n\n';
    wrapperNames.push(nameForSlide(i));
  });
  /*
  Step 10:
  * Finally, declare the default export as an array of the slide components.
  * See /examples/MDX/TestMDX.js for how to import and use the generated slide
  * components.
  */
  const footer = `export const slideCount = ${slides.length};\n\n
export default [${wrapperNames}]`;
  allCode += footer;

  return callback(null, allCode);
};