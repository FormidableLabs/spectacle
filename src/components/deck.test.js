import React, { Component } from "react";
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
        },
        style: {
          globalStyleSet: []
        }
      }),
      dispatch: () => {},
      subscribe: () => {}
    }
  };
};

class MockSlide extends Component {
  render() {
    return (<div>Slide Content</div>);
  }
}

const _mockChildContext = function () {
  return { styles: () => {} };
};

describe("<Deck />", () => {
  test("should render correctly.", () => {
    const wrapper = mount((
      <Deck transition={["zoom", "slide"]} transitionDuration={500}>
        <MockSlide />
        <MockSlide />
      </Deck>
    ), { context: _mockContext(0, []), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render the export configuration when specified.", () => {
    const wrapper = mount((
      <Deck>
        <MockSlide />
        <MockSlide />
      </Deck>
    ), { context: _mockContext(0, [ "export" ]), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render the overview configuration when specified.", () => {
    const wrapper = mount((
      <Deck>
        <MockSlide />
        <MockSlide />
      </Deck>
    ), { context: _mockContext(0, [ "overview" ]), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
