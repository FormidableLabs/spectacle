import { convertFontSizeToPx } from './font-size';
import { get } from 'lodash';

const recommendedMinFontSizePx = 24;

const fontSizeWarning = component => {
  const { props, context } = component;

  if (context.store && !get(context.store.getState(), 'style.globalStyleSet')) {
    return false;
  }

  const { textSize } = props;
  const fontSize = convertFontSizeToPx(textSize) || recommendedMinFontSizePx;

  if (fontSize < recommendedMinFontSizePx) {
    // eslint-disable-next-line
    console.warn(
      `prop \`textSize="${textSize}"\` is below the recommended minimum of ${recommendedMinFontSizePx}px`
    ); // eslint-disable-line
    return true;
  }
  return false;
};

const bgImageStyleWarning = component => {
  const { props } = component;
  const { bgLighten, bgDarken, bgImage, bgImageStyle, bgGradient } = props;

  if (!bgImageStyle) {
    return false;
  }

  if (bgImageStyle && (bgLighten || bgDarken || bgImage || bgGradient)) {
    // eslint-disable-next-line
    console.warn(
      `The backgroundImage property has been set directly as \`bgImageStyle="${bgImageStyle}"\`.
       Because bgImageStyle sets the backgroundImage to a string, the following 
       properties which modify backgroundImage will not be applied:
       ${bgLighten ? `bgLighten={${bgLighten}}` : ''}
       ${bgDarken ? `bgDarken={${bgDarken}}` : ''}
       ${bgImage ? `bgImage={${bgImage}}}` : ''}
       ${bgImage ? `bgImage={${bgGradient}}}` : ''}`
    );
    return true;
  }
  return false;
};

const styleWarnings = [bgImageStyleWarning, fontSizeWarning];

function checkWarnings(component, warnings = styleWarnings) {
  if (!component.warnings) {
    component.warnings = warnings;
  }
  if (component.warnings.length) {
    component.warnings = component.warnings.filter(w => !w(component));
  }
}

export default checkWarnings;
