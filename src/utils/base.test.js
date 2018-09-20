import { getStyles } from './base';
/* eslint-disable-next-line max-statements */
describe('getStyles', () => {
  let generateStyles;
  let _this;
  beforeEach(() => {
    _this = {
      props: {},
      context: {
        styles: {
          colors: { primary: 'pink' },
          fonts: { primary: 'Helvetica' }
        },
        store: {
          getState: () => ({
            style: {
              globalStyleSet: []
            }
          })
        }
      }
    };
    generateStyles = getStyles.bind(_this);
  });

  describe('italic', () => {
    it('should assign italic to fontStyle when italic is true', () => {
      _this.props.italic = true;
      const styles = generateStyles();
      expect(styles.fontStyle).toEqual('italic');
    });
    it('should assign normal to fontStyle when italic is false', () => {
      _this.props.italic = false;
      const styles = generateStyles();
      expect(styles.fontStyle).toEqual('normal');
    });
  });

  describe('fontWeight', () => {
    it('should assign bold to fontWeight when bold is true', () => {
      _this.props.bold = true;
      const styles = generateStyles();
      expect(styles.fontWeight).toEqual('bold');
    });

    it('should assign normal to fontWeight when bold is false', () => {
      _this.props.bold = false;
      const styles = generateStyles();
      expect(styles.fontWeight).toEqual('normal');
    });
  });

  describe('caps', () => {
    it('should assign uppercase to textTransform when caps is true', () => {
      _this.props.caps = true;
      const styles = generateStyles();
      expect(styles.textTransform).toEqual('uppercase');
    });

    it('should assign none to textTransform when caps is false', () => {
      _this.props.caps = false;
      const styles = generateStyles();
      expect(styles.textTransform).toEqual('none');
    });
  });

  describe('margin', () => {
    it('should assign margin value to margin ', () => {
      const marginValue = '30px';
      _this.props.margin = marginValue;
      const styles = generateStyles();
      expect(styles.margin).toEqual(marginValue);
    });
  });

  describe('padding', () => {
    it('should assign padding value to padding ', () => {
      const paddingValue = '30px';
      _this.props.padding = paddingValue;
      const styles = generateStyles();
      expect(styles.padding).toEqual(paddingValue);
    });
  });

  describe('textColor', () => {
    it('should assign textColor value to color ', () => {
      const textColorValue = 'blue';
      _this.props.textColor = textColorValue;
      _this.context.styles.colors = { color: textColorValue };
      const styles = generateStyles();
      expect(styles.color).toEqual(textColorValue);
    });

    it('should assign color to default color pink', () => {
      _this.props.textColor = _this.context.styles.colors.primary;
      const styles = generateStyles();
      expect(styles.color).toEqual('pink');
    });
  });

  describe('textFont', () => {
    it('should assign textFont value to fontFamily', () => {
      const textFontValue = 'Times New Roman';
      _this.props.textFont = textFontValue;
      _this.context.styles.fonts = { font: textFontValue };
      const styles = generateStyles();
      expect(styles.fontFamily).toEqual(textFontValue);
    });
  });

  describe('fontFamily', () => {
    it('should assign fontFamily to default font Helvetica', () => {
      _this.props.textFont = _this.context.styles.fonts.primary;
      const styles = generateStyles();
      expect(styles.fontFamily).toEqual('Helvetica');
    });
  });

  describe('textSize', () => {
    it('should assign textSize value to fontSize', () => {
      const textSizeVlaue = '40px';
      _this.props.textSize = textSizeVlaue;
      const styles = generateStyles();
      expect(styles.fontSize).toEqual(textSizeVlaue);
    });
  });

  describe('textAlign', () => {
    it('should assign textAlign value to textAlign', () => {
      const textAlignValue = 'right';
      _this.props.textAlign = textAlignValue;
      const styles = generateStyles();
      expect(styles.textAlign).toEqual(textAlignValue);
    });
  });

  describe('bgColor', () => {
    it('should assign bgColor value to backgroundColor ', () => {
      const bgColorValue = 'blue';
      _this.props.bgColor = bgColorValue;
      _this.context.styles.colors = { color: bgColorValue };
      const styles = generateStyles();
      expect(styles.backgroundColor).toEqual(bgColorValue);
    });

    it('should assign background to default color primary', () => {
      _this.props.bgColor = _this.context.styles.colors.primary;
      const styles = generateStyles();
      expect(styles.backgroundColor).toEqual('pink');
    });
  });

  describe('bgGradient', () => {
    it('should assign bgGradient value to backgroundImage', () => {
      const bgGradientValue = 'radial-gradient(red blue green)';
      const bgImageValue = 'https://sameimage.com/url....';
      _this.props.bgGradient = bgGradientValue;
      _this.props.bgImage = bgImageValue;
      const styles = generateStyles();
      expect(styles.backgroundImage).toEqual(bgGradientValue);
    });
  });

  describe('bgImage', () => {
    it('should assign bgImage value to backgroundImage', () => {
      const bgImageValue = 'https://sameimage.com/url....';
      _this.props.bgImage = bgImageValue;
      const styles = generateStyles();
      expect(styles.backgroundImage).toEqual(`url(${bgImageValue})`);
    });
  });
});

describe('bgImage additional values', () => {
  let generateStyles;
  let _this;
  beforeEach(() => {
    _this = {
      props: { bgImage: 'https://sameimage.com/url....' },
      context: {
        styles: {
          colors: { primary: 'pink' },
          fonts: { primary: 'Helvetica' }
        },
        store: {
          getState: () => ({
            style: {
              globalStyleSet: []
            }
          })
        }
      }
    };
    generateStyles = getStyles.bind(_this);
  });

  it('should assign bgDarken value to backgroundImage opacity', () => {
    const bgDarkenValue = 0.5;
    const backgroundImageValue = `linear-gradient( rgba(0, 0, 0, ${bgDarkenValue}), rgba(0, 0, 0, ${bgDarkenValue}) ), url(${
      _this.props.bgImage
    })`;
    _this.props.bgDarken = bgDarkenValue;
    const styles = generateStyles();
    expect(styles.backgroundImage).toEqual(backgroundImageValue);
  });

  it('should assign bgSize value to backgroundSize', () => {
    const bgSizeValue = 'auto';
    _this.props.bgSize = bgSizeValue;
    const styles = generateStyles();
    expect(styles.backgroundSize).toEqual(bgSizeValue);
  });

  /* eslint-disable-next-line quotes */
  it("should assign 'cover' to backgroundSize if a bgSize is not provided", () => {
    const styles = generateStyles();
    expect(styles.backgroundSize).toEqual('cover');
  });

  it('should assign bgPosition value to backgroundSize', () => {
    const bgPositionValue = 'auto';
    _this.props.bgPosition = bgPositionValue;
    const styles = generateStyles();
    expect(styles.backgroundPosition).toEqual(bgPositionValue);
  });

  /* eslint-disable-next-line quotes */
  it("should assign 'center center' to backgroundSize if a bgPosition is not provided", () => {
    const styles = generateStyles();
    expect(styles.backgroundPosition).toEqual('center center');
  });

  it('should assign bgRepeat value to backgroundSize', () => {
    const bgRepeatValue = 'repeat';
    _this.props.bgRepeat = bgRepeatValue;
    const styles = generateStyles();
    expect(styles.backgroundRepeat).toEqual(bgRepeatValue);
  });

  describe('overflow', () => {
    it('should assign overflow value to overflow', () => {
      const overflowValue = 'scroll';
      _this.props.overflow = overflowValue;
      const styles = generateStyles();
      expect(styles.overflow).toEqual(overflowValue);
    });
  });

  describe('height', () => {
    it('should assign height value to height', () => {
      const heightValue = 'scroll';
      _this.props.height = heightValue;
      const styles = generateStyles();
      expect(styles.height).toEqual(heightValue);
    });
  });
});
