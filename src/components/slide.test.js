import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Slide from "./slide";

const _mockContext = function () {
  return {
    styles: {
      global: {
        body: {
          background: "#eee"
        }
      },
      components: {
        content: {}
      }
    },
    store: {
      getState: () => ({ route: "" })
    }
  };
};

describe("<Slide />", () => {
  test("should render correctly without transitions.", () => {
    window.watchMedia = jest.fn();
    window.matchMedia = jest.fn().mockReturnValue({ matches: [] });
    const wrapper = mount((
      <Slide>
        <div>Slide Content</div>
      </Slide>
    ), { context: _mockContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render correctly with transitions.", () => {
    window.watchMedia = jest.fn();
    window.matchMedia = jest.fn().mockReturnValue({ matches: [] });

    const wrapper = mount((
      <Slide transition={["slide", "spin"]}>
        <div>Slide Content</div>
      </Slide>
    ), { context: _mockContext() });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
