import Progress from "./progress";
import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

const _mockSlides = function () {
  const Slide = () => (<div>Slide Content</div>);
  return [ <Slide key={0} />, <Slide key={1} />, <Slide key={2} /> ];
};

describe("<Progress />", () => {
  test("should render PacMan correctly", () => {
    const context = { styles: { progress: { pacman: [] } } };
    const wrapper = mount((
      <Progress
        type="pacman"
        items={_mockSlides()}
        currentSlide={2}
      />
    ), { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render the number style correctly", () => {
    const context = { styles: { progress: { number: [] } } };
    const wrapper = mount((
      <Progress
        type="number"
        items={_mockSlides()}
        currentSlide={1}
      />
    ), { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render the bar style correctly", () => {
    const context = { styles: { progress: { bar: [] } } };
    const wrapper = mount((
      <Progress
        type="bar"
        items={_mockSlides()}
        currentSlide={1}
      />
    ), { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should render nothing when none is provided.", () => {
    const context = { styles: { progress: {} } };
    const wrapper = mount((
      <Progress
        type="none"
        items={_mockSlides()}
        currentSlide={3}
      />
    ), { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
