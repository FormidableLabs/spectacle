'use strict';

const mdx = require('@mdx-js/mdx');

const EX_REG = /export\sdefault\s/g;
/*
 * See this link for an explanation of the regex solution:
 * https://stackoverflow.com/questions/6462578/regex-to-match-all-instances-not-inside-quotes/23667311#23667311
 * Note that the regex isn't concerned about code blocks (```).
 * Tracking pairs of ` should be sufficient to capture code blocks, too.
 */
const MOD_REG = /\\`|`(?:\\`|[^`])*`|(^(?:import|export).*$)/gm;

const NOTES_MARKER = 'Notes: ';
const NOTES_REG = new RegExp(`^${NOTES_MARKER}`, 'm');

const nameForComponent = (index, type) => `MDXContentWrapper${type}${index}`;

/*
 * We want to pull the notes out of each slide. This RegEx looks for "Notes: "
 * that starts on a new line. Anything after the notes marker will be considered notes.
 */
const isolateNotes = content => {
  const indexOfNotes = content.search(NOTES_REG);
  if (indexOfNotes >= 0) {
    // found the notes marker!
    return content.substring(indexOfNotes + NOTES_MARKER.length);
  }
  return '';
};

/*
 * When generating the slide components, we only want the slide content to be
 * compiled by mdx.sync. Remove all the notes content.
 */
const removeNotes = content => {
  const indexOfNotes = content.search(NOTES_REG);
  if (indexOfNotes >= 0) {
    // found the notes marker!
    return content.substring(0, indexOfNotes);
  }
  return content;
};

/*
 * As referenced before, we need to add the imports and exports to
 * every slide/note mdx string again. That way mdx.sync can find
 * the component definitions for any custom components used in the
 * MDX file.
 */
const addInlineModules = (content, inlineMods) => `
${inlineMods.join('\n')}\n
${content}`;

/*
 * Use mdx.sync to compile a separate JSX component for each slide
 * written in MDX.
 */
const sync = (content, options) => mdx.sync(content, options);

/*
 * mdx.sync will attempt to default export the component generated for each
 * slide. However, we have multiple slides and thus multiple generated components.
 * We can't export multiple defaults, so we must remove all existing occurences of
 * `export default`.
 */
const removeDefaultExport = content => content.replace(EX_REG, '');

/*
 * Remove the inline exports/imports. We don't want to duplicate inline import/export
 * statements littered throughout the file output.
 */
const removeInlineModules = content =>
  content.replace(MOD_REG, (value, group1) => {
    if (!group1) {
      // group1 is empty, so this is not the import/export case we're looking for
      return value;
    }
    return '';
  });

const trim = content => content.trim();

/*
 * The generated component from mdx.sync assumes it's the only component that
 * will inhabit a file. It has const definitions outside of the auto-named MDXContent
 * component. This would be fine if we weren't generating a component for each
 * slide/note. However, in our case we would generate a lot of duplicate variable names.
 * Thus, the easiest solution is to wrap each mdx.sync-generated component+const
 * definitions in another component that is uniquely named.
 */
const wrapComponent = (content, index, type) => {
  const wrapperName = nameForComponent(index, type);
  return `function ${wrapperName}(props) {
  ${content}
  return (<MDXContent {...props} />);
};
${wrapperName}.isMDXComponent = true;`;
};

module.exports = {
  isolateNotes,
  removeNotes,
  wrapComponent,
  trim,
  removeInlineModules,
  removeDefaultExport,
  sync,
  addInlineModules,
  nameForComponent,
  MOD_REG
};
