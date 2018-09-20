export const parseFontSize = function(fontSize) {
  const sizeComponents = fontSize.match(/\d*\.*\d+|\D+/g);
  const size = parseFloat(sizeComponents[0]);
  const unit = sizeComponents[1];
  return { size, unit };
};

export const getFontSizeFromElement = function(element) {
  const fontSize = window.getComputedStyle
    ? window.getComputedStyle(element).getPropertyValue('font-size')
    : element.currentStyle.fontSize;
  return fontSize ? parseFontSize(fontSize) : null;
};

export const convertFontSizeToPx = function(fontSize) {
  let convertedFontSize;

  if (typeof fontSize === 'number') {
    convertedFontSize = fontSize;
  } else if (typeof fontSize === 'string') {
    const parsedFont = parseFontSize(fontSize);
    const bodyFont = getFontSizeFromElement(document.body);
    const htmlFont = getFontSizeFromElement(document.documentElement);

    switch (parsedFont.unit) {
      case 'px':
        convertedFontSize = parsedFont.size;
        break;
      case 'pt':
        convertedFontSize = (parsedFont.size * 96) / 72;
        break;
      case '%':
        if (bodyFont) {
          convertedFontSize = (bodyFont.size * parsedFont.size) / 100;
        }
        break;
      case 'em':
        if (bodyFont) {
          convertedFontSize = bodyFont.size * parsedFont.size;
        }
        break;
      case 'rem':
        if (htmlFont) {
          convertedFontSize = htmlFont.size * parsedFont.size;
        }
        break;
    }
  }
  return convertedFontSize;
};
