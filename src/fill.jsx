import React from 'react/addons';
import assign from 'object-assign';

class Fill extends React.Component {
  render() {
    let styles = {
      flex: '1 100%'
    };
    return (
      <div style={assign({}, styles, this.context.styles.fill)}>
        {this.props.children}
      </div>
    )
  }
}

Fill.contextTypes = {
  styles: React.PropTypes.object
}

export default Fill;