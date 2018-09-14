import { getStyles } from './base';
/* eslint-disable */
describe('getStyles', () => {
  let fn;
  let _this;
  beforeEach(() => {
    _this = {
      props: {},
      context: {
        styles: {
          colors: { primary: 'pink' },
          fonts: { primary: 'Helvetica' }
        }
      }
    };
    fn = getStyles.bind(_this);
  });

  describe('italic', () => {
    it('should assign italic to fontStyle when italic is true', () => {
      _this.props.italic = true;
      const res = fn();
      expect(res.fontStyle).toEqual('italic');
    });
    it('should assign normal to fontStyle when italic is false', () => {
      _this.props.italic = false;
      const res = fn();
      expect(res.fontStyle).toEqual('normal');
    });
  });

  describe('fontWeight', () => {
    it('should assign bold to fontWeight when bold is true', () => {
      _this.props.bold = true;
      const res = fn();
      expect(res.fontWeight).toEqual('bold');
    });

    it('should assign normal to fontWeight when bold is false', () => {
      _this.props.bold = false;
      const res = fn();
      expect(res.fontWeight).toEqual('normal');
    });
  });

  describe('caps', () => {
    it('should assign uppercase to textTransform when caps is true', () => {
      _this.props.caps = true;
      const res = fn();
      expect(res.textTransform).toEqual('uppercase');
    });

    it('should assign none to textTransform when caps is false', () => {
      _this.props.caps = false;
      const res = fn();
      expect(res.textTransform).toEqual('none');
    });
  });

  describe('margin', () => {
    it('should assign margin value to margin ', () => {
      const marginValue = '30px';
      _this.props.margin = marginValue;
      const res = fn();
      expect(res.margin).toEqual(marginValue);
    });
  });

  describe('padding', () => {
    it('should assign padding value to padding ', () => {
      const paddingValue = '30px';
      _this.props.padding = paddingValue;
      const res = fn();
      expect(res.padding).toEqual(paddingValue);
    });
  });

  describe('textColor', () => {
    it('should assign textColor value to color ', () => {
      const textColorValue = 'blue';
      _this.props.textColor = textColorValue;
      _this.context.styles.colors = { color: textColorValue };
      const res = fn();
      expect(res.color).toEqual(textColorValue);
    });

    it('should assign color to default color pink', () => {
      _this.props.textColor = _this.context.styles.colors.primary;
      const res = fn();
      expect(res.color).toEqual('pink');
    });
  });

  describe('textFont', () => {
    it('should assign textFont value to fontFamily', () => {
      const textFontValue = 'Times New Roman';
      _this.props.textFont = textFontValue;
      _this.context.styles.fonts = { font: textFontValue };
      const res = fn();
      expect(res.fontFamily).toEqual(textFontValue);
    });
  });

  describe('fontFamily', () => {
    it('should assign fontFamily to default font Helvetica', () => {
      _this.props.textFont = _this.context.styles.fonts.primary;
      const res = fn();
      expect(res.fontFamily).toEqual('Helvetica');
    });
  });

  // Need to figure out how to test for textSize

  describe('textAlign', () => {
    it('should assign textAlign value to textAlign', () => {
      const textAlignValue = 'right';
      _this.props.textAlign = textAlignValue;
      const res = fn();
      expect(res.textAlign).toEqual(textAlignValue);
    });
  });

  describe('bgColor', () => {
    it('should assign bgColor value to backgroundColor ', () => {
      const bgColorValue = 'blue';
      _this.props.bgColor = bgColorValue;
      _this.context.styles.colors = { color: bgColorValue };
      const res = fn();
      expect(res.backgroundColor).toEqual(bgColorValue);
    });

    it('should assign background to default color primary', () => {
      _this.props.bgColor = _this.context.styles.colors.primary;
      const res = fn();
      expect(res.backgroundColor).toEqual('pink');
    });
  });

  describe('bgGradient', () => {
    it('should assign bgGradient value to backgroundImage', () => {
      const bgGradientValue = 'radial-gradient(red blue green)';
      _this.props.bgGradient = bgGradientValue;
      const res = fn();
      expect(res.backgroundImage).toEqual(bgGradientValue);
    });
  });

  describe('bgImage', () => {
    it('should assign bgImage value to backgroundImage', () => {
      const bgImageValue = 'https://sameimage.com/url....';
      _this.props.bgImage = bgImageValue;
      const res = fn();
      expect(res.backgroundImage).toEqual(`url(${bgImageValue})`);
    });
  });

  describe('bgImage additional values', () => {
    beforeEach(() => {
      _this.props.bgImage = 'https://sameimage.com/url....';
    });
    it('should assign bgDarken value to backgroundImage opacity', () => {
      const bgDarkenValue = 0.5;
      const backgroundImageValue = `linear-gradient( rgba(0, 0, 0, ${bgDarkenValue}), rgba(0, 0, 0, ${bgDarkenValue}) ), url(${
        _this.props.bgImage
      })`;
      _this.props.bgDarken = bgDarkenValue;
      const res = fn();
      expect(res.backgroundImage).toEqual(backgroundImageValue);
    });

    it('should assign bgSize value to backgroundSize', () => {
      const bgSizeValue = 'auto';
      _this.props.bgSize = bgSizeValue;
      const res = fn();
      expect(res.backgroundSize).toEqual(bgSizeValue);
    });

    it("should assign 'cover' to backgroundSize", () => {
      const res = fn();
      expect(res.backgroundSize).toEqual('cover');
    });

    it('should assign bgPosition value to backgroundSize', () => {
      const bgPositionValue = 'auto';
      _this.props.bgPosition = bgPositionValue;
      const res = fn();
      expect(res.backgroundPosition).toEqual(bgPositionValue);
    });

    it("should assign 'center center' to backgroundSize", () => {
      const res = fn();
      expect(res.backgroundPosition).toEqual('center center');
    });

    it('should assign bgRepeat value to backgroundSize', () => {
      const bgRepeatValue = 'repeat';
      _this.props.bgRepeat = bgRepeatValue;
      const res = fn();
      expect(res.backgroundRepeat).toEqual(bgRepeatValue);
    });
  });

  describe('overflow', () => {
    it('should assign overflow value to overflow', () => {
      const overflowValue = 'scroll';
      _this.props.overflow = overflowValue;
      const res = fn();
      expect(res.overflow).toEqual(overflowValue);
    });
  });

  describe('height', () => {
    it('should assign height value to height', () => {
      const heightValue = 'scroll';
      _this.props.height = heightValue;
      const res = fn();
      expect(res.height).toEqual(heightValue);
    });
  });
});
/* eslint-enable */
