import React from 'react/addons';
import assign from 'object-assign';

class CodePane extends React.Component {
  render() {
    return (
      <pre style={assign({}, this.context.styles.codePane.pre)}>
        <code style={assign({}, this.context.styles.codePane.code)}>
          {this.props.children}
        </code>
      </pre>
    )
  }
}

CodePane.contextTypes = {
  styles: React.PropTypes.object
}

export default CodePane;