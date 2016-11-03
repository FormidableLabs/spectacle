import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Layout from "./layout";

describe("<Layout />", () => {
  test("should render correctly", () => {
    const wrapper = mount(<Layout><div>Content</div></Layout>);
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
