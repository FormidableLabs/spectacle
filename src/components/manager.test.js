import React, { Component } from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Manager from "./manager";

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

describe("<Manager />", () => {
  test("should render correctly.", () => {
    const wrapper = mount((
      <Manager transition={["zoom", "slide"]} transitionDuration={500}>
        <MockSlide />
        <MockSlide />
      </Manager>
    ), { context: _mockContext(0, []), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render the export configuration when specified.", () => {
    const wrapper = mount((
      <Manager>
        <MockSlide />
        <MockSlide />
      </Manager>
    ), { context: _mockContext(0, [ "export" ]), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render the overview configuration when specified.", () => {
    const wrapper = mount((
      <Manager>
        <MockSlide />
        <MockSlide />
      </Manager>
    ), { context: _mockContext(0, [ "overview" ]), childContextTypes: _mockChildContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
