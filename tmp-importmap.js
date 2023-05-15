"use strict";

// TODO: Integrate into one-page build
// TODO: Remove script.
const path = require("path");

const { dependencies, peerDependencies } = require("./packages/spectacle/package.json");
const reactPkgPath = require.resolve("react/package.json", {
  paths: [
    path.resolve(__dirname, "packages/spectacle")
  ]
});
const { version: reactVersion } = require(reactPkgPath);
const DEPS = `deps=react@${reactVersion}`;

// Toggle dev resources. (Use if debugging load / dependency errors).
const IS_DEV = false;
const DEV = IS_DEV ? "&dev" : "";

const url = (k, v, extra = "") => {
  // Pin react.
  if (k === "react") {
    v = reactVersion;
  }
  return `https://esm.sh/v119/${k}@${v}?${DEPS}${DEV}${extra}`;
};

const map = Object
  .entries(Object.assign({}, dependencies, peerDependencies))
  .reduce((memo, [k, v]) => {
    // General
    memo[k] = url(k, v)

    // Special case internal deps
    if (k === "react") {
      memo[`${k}/jsx-runtime`] = url(k, v, "/jsx-runtime");
    }
    if (k === "react-syntax-highlighter") {
      memo[`${k}/dist/cjs/styles/prism/vs-dark.js`] = url(k, v, "/dist/esm/styles/prism/vs-dark.js");
      memo[`${k}/dist/cjs/styles/prism/index.js`] = url(k, v, "/dist/esm/styles/prism/index.js");
    }
    return memo;
  }, {});

console.log(JSON.stringify(map, null, 2));
