import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Deck from "./deck";

const _mockContext = function (slide, routeParams) {
  return {
    styles: {
      global: {
        body: []
      },
      controls: {},
      progress: {
        pacman: []
      }
    },
    store: {
      getState: () => ({
        route: {
          params: routeParams,
          slide
        }
      }),
      dispatch: () => {},
      subscribe: () => {}
    }
  };
};

const _mockChildContext = function () {
  return { styles: () => {} };
};

describe("<Deck />", () => {
  test("should render correctly.", () => {
    const wrapper = mount((
      <Deck transition={["zoom", "slide"]} transitionDuration={500}>
        <div id={1}>Slide 1</div>
        <div id={2}>Slide 2</div>
      </Deck>
    ), { context: _mockContext(0, []), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render the export configuration when specified.", () => {
    const wrapper = mount((
      <Deck>
        <div id={1}>Slide 1</div>
        <div id={2}>Slide 2</div>
      </Deck>
    ), { context: _mockContext(0, [ "export" ]), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render the overview configuration when specified.", () => {
    const wrapper = mount((
      <Deck>
        <div id={1}>Slide 1</div>
        <div id={2}>Slide 2</div>
      </Deck>
    ), { context: _mockContext(0, [ "overview" ]), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
