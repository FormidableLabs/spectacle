const pkgInfo = require('../package.json');

let external = ['dns', 'fs', 'path', 'url'];
if (pkgInfo.peerDependencies)
  external.push(...Object.keys(pkgInfo.peerDependencies));
if (pkgInfo.dependencies) external.push(...Object.keys(pkgInfo.dependencies));

external = external.filter(
  x => x !== 'query-string' && x !== 'styled-components'
);

const externalPredicate = new RegExp(`^(${external.join('|')})($|/)`);
const externalTest = id => {
  if (id === 'babel-plugin-transform-async-to-promises/helpers') {
    return false;
  }

  return externalPredicate.test(id);
};

export default externalTest;
