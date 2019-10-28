const pkgInfo = require('../package.json');

// add all dependencies defined in package.json into external array
// as we don't want to bundle these
const dependencyTypes = ['peerDependencies', 'optionalDependencies', 'dependencies']
const external = dependencyTypes.reduce((acc, dependencyType) => {
  if (pkgInfo[dependencyType])
    acc.push(...Object.keys(pkgInfo[dependencyType]));
  return acc;
}, []);

// create a regex of all external modules
const externalPredicate = new RegExp(`^(${external.join('|')})($|/)`);
// test against this regex to deterime if a module is external
const externalTest = id => externalPredicate.test(id);

export default externalTest;
