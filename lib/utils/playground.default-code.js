"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultCode = exports.defaultCode = "\n/**\n * Sample React Component\n * Output domContainerNode is 'mountNode'\n */\n\nconst styles = {\n  heading: {\n    fontSize: \"2.25rem\",\n    fontWeight: \"bold\"\n  },\n  copy: {\n    fontSize: \"1.5rem\"\n  }\n}\n\nconst HelloWorld = ({ name }) => (\n  <div>\n    <h1 style={styles.heading}>\n      Create Live Code Examples in {name}!\n    </h1>\n    <p style={styles.copy}>\n      Supports Light and Dark Syntax Themes\n    </p>\n  </div>\n)\n\nrender(<HelloWorld name=\"Spectacle\" />)\n";