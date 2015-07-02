import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';
import Radium from 'radium';

@Radium
class Link extends Base {
  render() {
    return (
      <a href={this.props.href} style={[this.context.styles.components.link, this.getStyles()]}>
        {this.props.children}
      </a>
    )
  }
}

Link.contextTypes = {
  styles: React.PropTypes.object
}

export default Link;