import React from "react/addons";

import {Deck} from "../src/spectacle";

import slides from "./slides/";

import preloader from "../src/utils/preloader";

const images = {
  city: require("./city.jpg"),
  kat: require("./kat.png"),
  logo: require("./formidable-logo.svg")
};

preloader([images.city, images.kat]);

export default class extends React.Component {
  render() {
    return (
      <Deck transitionDuration={800}>
        {slides}
      </Deck>
    );
  }
}
