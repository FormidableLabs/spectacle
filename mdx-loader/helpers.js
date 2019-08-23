const mdx = require('@mdx-js/mdx');

const EX_REG = /export\sdefault\s/g;
/*
 * See this link for an explanation of the regex solution:
 * https://stackoverflow.com/questions/6462578/regex-to-match-all-instances-not-inside-quotes/23667311#23667311
 * Note that the regex isn't concerned about code blocks (```).
 * Tracking pairs of ` should be sufficient to caputre code blocks, too.
 */
const MOD_REG = /\\`|`(?:\\`|[^`])*`|(^(?:import|export).*$)/gm;

const NOTES_MARKER = 'Notes: ';
const NOTES_REG = new RegExp(`^${NOTES_MARKER}`, 'm');

const nameForContent = (index, type) => `MDXContentWrapper${type}${index}`;

const isolateNotes = content => {
  const indexOfNotes = content.search(NOTES_REG);
  if (indexOfNotes >= 0) {
    // found the notes marker!
    return content.substring(indexOfNotes + NOTES_MARKER.length);
  }
  return null;
};

const removeNotes = content => {
  const indexOfNotes = content.search(NOTES_REG);
  if (indexOfNotes >= 0) {
    // found the notes marker!
    return content.substring(0, indexOfNotes);
  }
  return null;
};

const addInlineModules = (content, inlineMods) => `
${inlineMods.join('\n')}\n
${content}`;

const sync = (content, options) => mdx.sync(content, options);

const removeDefaultExport = content => content.replace(EX_REG, '');

const removeInlineModules = content =>
  content.replace(MOD_REG, (value, group1) => {
    if (!group1) {
      // group1 is empty, so this is not the import/export case we're looking for
      return value;
    }
    return '';
  });

const trim = content => content.trim();

const wrapComponent = (content, index, type) => {
  const wrapperName = nameForContent(index, type);
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
  nameForContent,
  MOD_REG
};
