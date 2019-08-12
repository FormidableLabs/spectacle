const path = require('path');
const fs = require('fs');

const isMDXFileType = extension => extension === '.mdx' || extension === '.md';

const fileExists = srcPath => {
  const absSrcPath = path.resolve(srcPath);
  return new Promise(resolve => {
    fs.exists(absSrcPath, exists => {
      resolve(exists);
    });
  });
};

const validatePresentationMode = async src => {
  /* - the default action of the CLI is to boot up a presentation from a file
   * - src defaults to `slides.mdx`
   * - first, check to see if the file type is supported
   * - then check to see if the default or provided file exists
   */

  const validatedValue = {};
  const extension = path.extname(src);

  if (isMDXFileType(extension)) {
    validatedValue['mdx'] = src;
  }
  // support other file types here
  else {
    throw new Error(`The file type ${extension} is not currently supported.`);
  }

  const exists = await fileExists(src);
  if (!exists) {
    throw new Error(
      `A file cannot be found at the path "${src}". Remember that the default file is ./slides.mdx`
    );
  }

  return validatedValue;
};

module.exports = validatePresentationMode;
