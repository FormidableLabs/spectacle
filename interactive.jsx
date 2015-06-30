import React from 'react/addons';
import Heading from './src/heading';

class Interactive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      count: this.state.count + 1
    });
  }
  render() {
    let styles = {
      padding: 20,
      background: 'black',
      minWidth: 200,
      textTransform: 'uppercase',
      border: 'none',
      color: '#f9c300',
      outline: 'none'
    };
    return (
      <div>
        <Heading size={5} textColor="black">The button has been clicked {this.state.count} times</Heading>
        <button style={styles} type="button" onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }
}

export default Interactive;