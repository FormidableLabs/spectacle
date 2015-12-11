import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import expect from "expect";
import Radium from "radium";
import BlockQuote from "../../src/components/block-quote";

describe("block-quote", (done) => {

  let node;
  beforeEach(() => node = document.createElement("div"));
  afterEach(() => unmountComponentAtNode(node));

  it("renders", () => {
    render((
      <BlockQuote />
    ), node);

    console.log("yo!");
  });
});

