import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleFont } from 'react-typography';

class Typeface extends Component {
  getChildContext() {
    return {
      typeface: {
        fontFamily: this.props.googleFont || this.props.font || '',
        fontWeight: this.props.weight,
        fontStyle: this.props.italic ? 'italic' : 'normal'
      }
    };
  }

  render() {
    const { children, googleFont, weight = 400, italic = false, styles } = this.props;
    if (typeof googleFont !== 'undefined' && googleFont.length > 0) {
      const styleSuffix = italic ? 'i' : '';
      const config = {
        title: `${googleFont}`,
        options: {
          googleFonts: [
            {
              name: googleFont,
              styles: styles || [ `${weight}${styleSuffix}` ]
            }
          ]
        }
      };
      return (
        <div>
          <GoogleFont typography={config} />
          { children }
        </div>
      );
    } else {
      return (
        <div>{ children }</div>
      );
    }
  }
}

Typeface.propTypes = {
  children: PropTypes.node,
  font: PropTypes.string,
  googleFont: PropTypes.string,
  italic: PropTypes.bool,
  styles: PropTypes.array,
  weight: PropTypes.number
};

Typeface.childContextTypes = {
  typeface: PropTypes.object
};

export default Typeface;
