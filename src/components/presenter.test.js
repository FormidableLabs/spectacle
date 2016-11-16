import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Presenter from "./presenter";

const _mockRoute = function (slide) {
  return { params: [], slide };
};

const _mockContext = function () {
  return {
    store: {
      getState: () => ({ route: "" })
    }
  };
};

const _mockSlides = function () {
  const Slide = () => (<div>Slide Content</div>);
  return [ <Slide key={0} />, <Slide key={1} />, <Slide key={2} /> ];
};

const _mockSlidesWithNotes = function () {
  const notes = "These are my slide notes!!";
  const Slide = () => (<div>Slide Content</div>);
  return [ <Slide key={0} />, <Slide key={1} notes={notes} />, <Slide key={2} /> ];
};

describe("<Presenter />", () => {
  test("should render correctly", () => {
    const wrapper = mount((
      <Presenter
        dispatch={() => {}}
        slides={_mockSlides()}
        slide={1}
        hash={1}
        route={_mockRoute(1)}
        lastSlide={0}
      />
    ), { context: _mockContext() });
    wrapper.setState({ time: "Mon Nov 07 2016 11:04:08 GMT-0600 (CST)" });
    wrapper.instance().componentWillMount = jest.fn();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render with notes when slides have them.", () => {
    const wrapper = mount((
      <Presenter
        dispatch={() => {}}
        slides={_mockSlidesWithNotes()}
        slide={1}
        hash={1}
        route={_mockRoute(1)}
        lastSlide={0}
      />
    ), { context: _mockContext() });
    wrapper.setState({ time: "Mon Nov 07 2016 11:04:08 GMT-0600 (CST)" });
    wrapper.instance().componentWillMount = jest.fn();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
