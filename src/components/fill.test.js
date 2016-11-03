import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Fill from "./fill";

describe("<Fill />", () => {
  test("should render with style `flex: 1`", () => {
    const wrapper = mount(<Fill>Spectacle</Fill>);
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
