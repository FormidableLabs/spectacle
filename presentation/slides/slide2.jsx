import React from "react/addons";
import assign from "object-assign";
import Radium from "radium";
import {
  Slide, Heading, Image
} from "../../src/spectacle";
const images = {
  city: require("../city.jpg"),
  kat: require("../kat.png"),
  logo: require("../formidable-logo.svg")
};

@Radium
class Slide2 extends Slide {
  render() {
    return this.getRenderFor([
      <Image src={images.kat.replace("/", "")} margin="0px auto 40px" height="293px"/>,
      <Heading size={1} fit textColor="primary" textFont="secondary">
        Wait what?
      </Heading>
    ]);
  }
}

Slide2.defaultProps = assign({}, Slide.defaultProps, {
  transition: ["slide"],
  bgColor: "black"
});

export default Slide2;
