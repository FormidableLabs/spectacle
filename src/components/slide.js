/* eslint-disable no-invalid-this */
import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { getStyles } from '../utils/base';
import Radium from 'radium';
import { addFragment } from '../actions';
import { Transitionable, renderTransition } from './transitionable';

@Transitionable
@Radium
class Slide extends React.PureComponent {
  state = {
    contentScale: 1,
    transitioning: true,
    z: 1,
    zoom: 1
  };

  getChildContext() {
    return { slideHash: this.props.hash };
  }

  componentDidMount() {
    this.setZoom();
    const slide = this.slideRef;
    const frags = slide.querySelectorAll('.fragment');
    if (frags && frags.length && !this.context.overview) {
      Array.prototype.slice.call(frags, 0).forEach((frag, i) => {
        frag.dataset.fid = i;
        return (
          this.props.dispatch &&
          this.props.dispatch(
            addFragment({
              slide: this.props.hash,
              id: i,
              visible: this.props.lastSlideIndex > this.props.slideIndex,
            })
          )
        );
      });
    }
    window.addEventListener('load', this.setZoom);
    window.addEventListener('resize', this.setZoom);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setZoom);
  }

  setZoom = () => {
    const mobile = window.matchMedia('(max-width: 628px)').matches;
    const content = this.contentRef;
    if (content) {
      const zoom = this.props.viewerScaleMode ? 1 : content.offsetWidth / this.context.contentWidth;

      const contentScaleY = content.parentNode.offsetHeight / this.context.contentHeight;
      const contentScaleX = this.props.viewerScaleMode
        ? content.parentNode.offsetWidth / this.context.contentWidth
        : content.parentNode.offsetWidth / this.context.contentHeight;
      const minScale = Math.min(contentScaleY, contentScaleX);

      let contentScale = minScale < 1 ? minScale : 1;
      if (mobile && this.props.viewerScaleMode !== true) {
        contentScale = 1;
      }

      this.setState({
        zoom: zoom > 0.6 ? zoom : 0.6,
        contentScale,
      });
    }
  };

  allStyles() {
    const { align, print } = this.props;

    const styles = {
      outer: {
        position: this.props.export ? 'relative' : 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: this.context.styles.global.body.background
          ? this.context.styles.global.body.background
          : '',
        ...this.props.style,
      },
      inner: {
        display: 'flex',
        position: 'relative',
        flex: 1,
        alignItems: align ? align.split(' ')[1] : 'center',
        justifyContent: align ? align.split(' ')[0] : 'center',
      },
      content: {
        flex: 1,
        maxHeight: this.context.contentHeight || 700,
        maxWidth: this.context.contentWidth || 1000,
        transform: `scale(${this.state.contentScale})`,
        padding: this.state.zoom > 0.6 ? this.props.margin || 40 : 10,
      },
    };

    const overViewStyles = {
      inner: {
        flexDirection: 'column',
      },
      content: {
        width: '100%',
      },
    };

    const printStyles = print
      ? {
          backgroundColor: 'white',
          backgroundImage: 'none',
        }
      : {};

    return { styles, overViewStyles, printStyles };
  }

  @renderTransition render() {
    const { presenterStyle, children } = this.props;
    const { styles, overViewStyles, printStyles } = this.allStyles();

    if (!this.props.viewerScaleMode) {
      document.documentElement.style.fontSize = `${16 * this.state.zoom}px`;
    }

    const contentClass = isUndefined(this.props.className)
      ? ''
      : this.props.className;
    return (
      <div
        className="spectacle-slide"
        ref={s => {
          this.slideRef = s;
        }}
        style={[
          styles.outer,
          getStyles.call(this),
          printStyles,
          presenterStyle,
        ]}
      >
        <div
          style={[styles.inner, this.context.overview && overViewStyles.inner]}
        >
          <div
            ref={c => {
              this.contentRef = c;
            }}
            className={`${contentClass} spectacle-content`}
            style={[
              styles.content,
              this.context.styles.components.content,
              this.context.overview && overViewStyles.content,
            ]}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Slide.defaultProps = {
  align: 'center center',
  presenterStyle: {},
  style: {},
  viewerScaleMode: false,
};

Slide.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func,
  export: PropTypes.bool,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastSlideIndex: PropTypes.number,
  margin: PropTypes.number,
  notes: PropTypes.any,
  presenterStyle: PropTypes.object,
  print: PropTypes.bool,
  slideIndex: PropTypes.number,
  style: PropTypes.object,
  viewerScaleMode: PropTypes.bool,
};

Slide.contextTypes = {
  styles: PropTypes.object,
  contentWidth: PropTypes.number,
  contentHeight: PropTypes.number,
  export: PropTypes.bool,
  print: PropTypes.object,
  overview: PropTypes.bool,
  store: PropTypes.object
};

Slide.childContextTypes = {
  slideHash: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Slide;
