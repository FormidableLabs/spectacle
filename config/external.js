const pkgInfo = require('../package.json');

let external = [];

// add all dependencies defined in package.json into external array
// as we don't want to bundle these
if (pkgInfo.peerDependencies)
  external.push(...Object.keys(pkgInfo.peerDependencies));
if (pkgInfo.dependencies) external.push(...Object.keys(pkgInfo.dependencies));

// create a regex of all external modules
const externalPredicate = new RegExp(`^(${external.join('|')})($|/)`);
// test against this regex to deterime if a module is external
const externalTest = id => externalPredicate.test(id);

export default externalTest;
