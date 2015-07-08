import React from "react/addons";
import assign from "object-assign";
import Radium from "radium";
import {
  Slide, Heading, Link, Text
} from "../../src/spectacle";
import Interactive from "../interactive";

@Radium
class Slide1 extends Slide {
  render() {
    return this.getRenderFor([
      <Heading size={1} caps fit textColor="tertiary">
        Your presentations are interactive
      </Heading>,
      <Interactive/>
    ]);
  }
}

Slide1.defaultProps = assign({}, Slide.defaultProps, {
  transition: ["slide"],
  bgColor: "primary"
});

export default Slide1;
