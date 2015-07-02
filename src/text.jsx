import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';
import Radium from 'radium';

@Radium
class Text extends Base {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = {
      width: 256,
      height: 24
    };
  }
  componentDidMount () {
    this.resize();
    window.addEventListener('load', this.resize);
  }
  componentWillReceiveProps () {
    this.resize();
  }
  resize() {
    if (this.props.fit) {
      let el = React.findDOMNode(this.refs.text)
      let state = this.state
      let width = el.offsetWidth || el.getComputedTextLength()
      let height = el.offsetHeight || 24
      if (state.width !== width || state.height !== height) {
        this.setState({
          width: width,
          height: height
        });
      }
    }
  }
  render() {
    let viewBox = [
      0, 0,
      this.state.width,
      this.state.height - 8
    ].join(' ');
    let styles = {
      svg: {
        width: '100%',
        maxHeight: '100%',
        fill: 'currentcolor',
        overflow: 'visible'
      },
      text: {
        fontFamily: 'inherit',
        fontSize: '1rem',
        fontWeight: 'inherit',
        textAnchor: 'middle'
      }
    };
    return this.props.fit
    ? <span style={[this.context.styles.components.text, this.getStyles()]}>
        <svg {...this.props}
          viewBox={viewBox}
          style={styles.svg}>
          <text
            ref='text'
            x='50%'
            y='13'
            style={styles.text}>
            {this.props.children}
          </text>
        </svg>
      </span>
    : <p style={[this.context.styles.components.text, this.getStyles()]}>
        {this.props.children}
      </p>
  }
}

Text.contextTypes = {
  styles: React.PropTypes.object
}

export default Text;