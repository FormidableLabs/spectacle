import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Fullscreen from "./fullscreen";

describe("<Fullscreen />", () => {
  test("should render correctly.", () => {
    const context = { styles: { styles: { fullscreen: {} } } };
    const wrapper = mount(<Fullscreen />, { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should toggle fullscreen when the button is selected.", () => {
    const context = { styles: { styles: { fullscreen: {} } } };
    const wrapper = mount(<Fullscreen />, { context });
    wrapper.instance().handleToggleFullScreen = jest.fn();
    wrapper.update();
    wrapper.find("svg").simulate("click");
    expect(wrapper.instance().handleToggleFullScreen).toHaveBeenCalledTimes(1);
  });
});
