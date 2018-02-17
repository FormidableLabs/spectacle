const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

// remove /presentation-blog/ folder if it already exists
exports.removeDir = function removeDir(path) {
  return new Promise((resolve, reject) => {
    rimraf(path, {}, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

// create /presentation-blog/ folder 
exports.createDir = function createDir(path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}