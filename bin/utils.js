const fs = require('fs');
const path = require('path');

exports.mkDirByPathSync = function mkDirByPathSync(targetDir) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve('.', parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }

      console.log(`Sorry -- directory ${curDir} already exists!`);
    }

    return curDir;
  }, initDir);
}