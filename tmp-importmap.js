"use strict";

const { dependencies, peerDependencies } = require("./packages/spectacle/package.json");

const url = (k, v, extra = "") => `https://esm.sh/v119/${k}@${v}${extra}`;

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
    }
    return memo;
  }, {});

console.log(JSON.stringify(map, null, 2));
