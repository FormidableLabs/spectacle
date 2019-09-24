/**
 * A manual port of https://unpkg.com/stylis-rule-sheet@0.0.10/index.js
 */
export default function (insertRule) {
  var delimiter = '/*|*/'
  var needle = delimiter+'}'

  function toSheet (block) {
    if (block)
      try {
        insertRule(block + '}')
      } catch (e) {}
  }

  return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
    switch (context) {
      // property
      case 1:
        // @import
        if (depth === 0 && content.charCodeAt(0) === 64)
          return insertRule(content+';'), ''
        break
      // selector
      case 2:
        if (ns === 0)
          return content + delimiter
        break
      // at-rule
      case 3:
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            return insertRule(selectors[0]+content), ''
          default:
            return content + (at === 0 ? delimiter : '')
        }
      case -2:
        content.split(needle).forEach(toSheet)
    }
  }
};
