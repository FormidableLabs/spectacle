// Indent to smallest non-empty whitespace level and trim start / end of string.
const indentNormalizer = val => {
  let prefix = null;
  return (val || '')
    .split('\n')
    .filter(line => {
      const [cur, remainder] = (line.match(/^([ ]*)([^ ]+)/) || []).slice(1);
      return remainder
        ? ((prefix =
            null === prefix || cur.length < prefix.length ? cur : prefix),
          !0)
        : null !== prefix;
    })
    .map(line => (prefix ? line.replace(prefix, '') : line))
    .join('\n')
    .trimRight();
};
export default indentNormalizer;
