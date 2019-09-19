const path = require('path');
const fs = require('fs');

const isMDXFileType = extension => extension === '.mdx' || extension === '.md';
const isJSFileType = extension => extension === '.js';

const fileExists = srcPath => {
  const absSrcPath = path.resolve(srcPath);
  return new Promise(resolve => {
    fs.exists(absSrcPath, exists => {
      resolve(exists);
    });
  });
};

const validatePresentationMode = async (src, theme) => {
  /* - the default action of the CLI is to boot up a presentation from a file
   * - src defaults to `slides.mdx`
   * - theme has no default
   * - first, check to see if the file type is supported
   * - then check to see if the default or provided file exists
   */

  const validatedValue = {};
  const srcExtension = path.extname(src);

  if (isMDXFileType(srcExtension)) {
    validatedValue['mdx'] = src;
  }
  // support other file types here
  else {
    throw new Error(
      `The file type "${srcExtension}" is not currently supported for MDX presentations.`
    );
  }

  const mdxExists = await fileExists(src);
  if (!mdxExists) {
    throw new Error(
      `A md(x) file cannot be found at the path "${src}". Remember that the default file is ./slides.mdx`
    );
  }

  if (theme) {
    const themeExtension = path.extname(theme);
    if (isJSFileType(themeExtension)) {
      validatedValue['theme'] = theme;
    } else {
      throw new Error(
        `The file type "${themeExtension}" is not currently supported for theme extensions.`
      );
    }

    const themeExists = await fileExists(theme);
    if (!themeExists) {
      throw new Error(`A theme file cannot be found at the path "${src}".`);
    }
  }

  return validatedValue;
};

module.exports = validatePresentationMode;
