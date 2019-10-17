const pkgInfo = require('../package.json');

let external = ['dns', 'fs', 'path', 'url'];

// add all dependencies defined in package.json into external array
// as we don't want to bundle these
if (pkgInfo.peerDependencies)
  external.push(...Object.keys(pkgInfo.peerDependencies));
if (pkgInfo.dependencies) external.push(...Object.keys(pkgInfo.dependencies));

// optionally remove some dependencies from the external that don't have
// compatible, browser-ready ESM builds so we should just bundle them.
// This can lead to stale dependencies so should be removed as soon as
// a compatible ESM version/alternative is available.
external = external.filter(
  x => x !== 'query-string' && x !== 'styled-components'
);

// create a regex of all external modules
const externalPredicate = new RegExp(`^(${external.join('|')})($|/)`);
// test against this regex to deterime if a module is external
const externalTest = id => externalPredicate.test(id);

export default externalTest;
