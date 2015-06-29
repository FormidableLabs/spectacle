import React from 'react/addons';
import assign from 'object-assign';
import tweenState from 'react-tween-state';
import Base from './base';
import Transitions from './transitions';
import config from '../config';

const Slide = React.createClass({
  displayName: 'Slide',
  mixins: [tweenState.Mixin, Base.Mixin, Transitions],
  contextTypes: {
    styles: React.PropTypes.object
  },
  getInitialState() {
    return {
      zoom: 1
    }
  },
  setZoom() {
    let content = React.findDOMNode(this.refs.content);
    this.setState({
      zoom: (content.offsetWidth / config.width)
    });
  },
  componentDidMount() {
    this.setZoom();
    window.addEventListener('resize', this.setZoom);
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.setZoom);
  },
  render() {
    let styles = {
      outer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'table',
        tableLayout: 'fixed'
      },
      inner: {
        display: 'table-cell',
        textAlign: this.props.align ? this.props.align.split(' ')[0] : 'center',
        verticalAlign: this.props.align ? this.props.align.split(' ')[1] : 'middle',
        padding: config.margin
      },
      content: {
        maxWidth: config.width,
        fontSize: 16 * this.state.zoom
      }
    };
    return (
      <div style={assign({}, styles.outer, this.getStyles(), this.getTransitionStyles())}>
        <div style={styles.inner}>
          <div ref="content"
            style={assign({}, styles.content, this.context.styles.components.content)}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
});

export default Slide;
