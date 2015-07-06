import React from 'react/addons';
import assign from 'object-assign';
import BaseWithTransition from './transitions';
import config from '../presentation/config';

class Slide extends BaseWithTransition {
  constructor(props) {
    super(props);

    this.state.zoom = 1;
    this.state.contentScale = 1;

    this.setZoom = this.setZoom.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.getRenderFor = this.getRenderFor.bind(this);
  }

  setZoom() {
    let content = React.findDOMNode(this.refs.content);
    let zoom = (content.offsetWidth / config.width);
    let contentScale = (content.parentNode.offsetHeight / config.height);
    this.setState({
      zoom: zoom > 0.6 ? zoom : 0.6,
      contentScale: contentScale < 1 ? contentScale : 1
    });
  }

  componentDidMount() {
    this.setZoom();
    window.addEventListener('load', this.setZoom);
    window.addEventListener('resize', this.setZoom);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setZoom);
  }

  getRenderFor(jsx) {
    let exportMode = false;
    let printMode = false;
    if (this.context.router.state.location.query &&
        'export' in this.context.router.state.location.query) {
      exportMode = true;
      if ('print' in this.context.router.state.location.query) {
        printMode = true;
      }
    }

    let printStyles = printMode ? {
      backgroundColor: 'white',
      backgroundImage: 'none'
    } : {};
    let styles = {
      outer: {
        position: exportMode ? 'relative' : 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex'
      },
      inner: {
        display: 'flex',
        position: 'relative',
        flex: 1,
        alignItems: this.props.align ? this.props.align.split(' ')[1] : 'center',
        justifyContent: this.props.align ? this.props.align.split(' ')[0] : 'center'
      },
      content: {
        flex: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        maxWidth: config.width,
        fontSize: 16 * this.state.zoom,
        transform: ' translate(-50%,-50%) scale(' + this.state.contentScale + ')',
        padding: this.state.zoom > 0.6 ? config.margin : 10
      }
    };
    return (
      <div className="spectacle-slide"
        style={assign(styles.outer, this.getStyles(), this.getTransitionStyles(), printStyles, this.props.presenterStyle)}>
        <div style={styles.inner}>
          <div ref="content"
            className="spectacle-content"
            style={assign(styles.content, this.context.styles.components.content)}>
            {jsx}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.getRenderFor(this.props.children);
  }
}

Slide.propTypes = assign(BaseWithTransition.propTypes, {
  align: React.PropTypes.string,
  presenterStyle: React.PropTypes.object
});

Slide.defaultProps = assign(BaseWithTransition.defaultProps, {
  align: 'center center',
  presenterStyle: {}
});

Slide.contextTypes = assign(BaseWithTransition.contextTypes, {
  styles: React.PropTypes.object
});

export default Slide;
