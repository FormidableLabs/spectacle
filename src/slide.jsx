import React from 'react/addons';
import assign from 'object-assign';

class Slide extends React.Component {
  render() {
    return (
      <div style={this.context.styles.slide}>
        <div style={this.context.styles.slideInner}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Slide.contextTypes = {
  styles: React.PropTypes.object
}

export default Slide;
