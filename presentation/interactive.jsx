import React from "react/addons";
import Heading from "../src/heading";

class Interactive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      count: this.state.count + 1
    });
  }
  render() {
    const styles = {
      padding: 20,
      background: "black",
      minWidth: 300,
      marginTop: 20,
      textTransform: "uppercase",
      border: "none",
      color: "white",
      outline: "none",
      fontWeight: "bold",
      fontSize: "2em"
    };
    return (
      <div>
      {this.state.count < 5 ?
        <div>
          <Heading size={5} textColor="black">
            The button has been clicked {this.state.count} times
          </Heading>
          <button style={styles} type="button" onClick={this.handleClick}>Click Me</button>
        </div> :
          <Heading size={5} fit caps textColor="black">Easy there pal</Heading>
        }
      </div>
    );
  }
}

export default Interactive;
