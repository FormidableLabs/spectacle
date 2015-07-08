import React from "react/addons";
import assign from "object-assign";
import Radium from "radium";
import {
  Slide, Heading, Appear
} from "../../src/spectacle";
const images = {
  city: require("../city.jpg"),
  kat: require("../kat.png"),
  logo: require("../formidable-logo.svg")
};

@Radium
class Slide4 extends Slide {
  render() {
    return this.getRenderFor([
      <Appear>
        <Heading size={1} caps fit textColor="primary">
          Full Width
        </Heading>
      </Appear>,
      <Appear>
        <Heading size={1} caps fit textColor="tertiary">
          Adjustable Darkness
        </Heading>
      </Appear>,
      <Appear>
        <Heading size={1} caps fit textColor="primary">
          Background Imagery
        </Heading>
      </Appear>
    ]);
  }
}

Slide4.defaultProps = assign({}, Slide.defaultProps, {
  transition: ["slide"],
  bgImage: images.city.replace("/", ""),
  bgDarken: 0.75
});

export default Slide4;
