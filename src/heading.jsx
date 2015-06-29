import React from 'react/addons';
import assign from 'object-assign';

class Heading extends React.Component {
  constructor () {
    super ()
    this.resize = this.resize.bind(this);
    this.state = {
      width: 256,
      height: 24
    };
  }
  componentDidMount () {
    this.resize()
  }
  componentWillReceiveProps () {
    this.resize()
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
    let Tag = "H" + this.props.size;
    let viewBox = [
      0, 0,
      this.state.width,
      this.state.height
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
    ? <svg {...this.props}
        viewBox={viewBox}
        style={styles.svg}>
        <text
          ref='text'
          x='50%'
          y={16}
          style={styles.text}>
          {this.props.children}
        </text>
      </svg>
    : React.createElement(Tag, {
        style: assign({}, this.context.styles.heading["h" + this.props.size])
      }, this.props.children)
  }
}

Heading.contextTypes = {
  styles: React.PropTypes.object
}

export default Heading;