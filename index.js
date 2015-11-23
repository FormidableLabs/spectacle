import React, { PropTypes } from "react";
import { render } from "react-dom";

import Deck from "./presentation/deck";

require("normalize.css");
require("./themes/default/index.css");
require("highlight.js/styles/monokai_sublime.css");

render(
  <Deck/>
, document.getElementById("root"));
