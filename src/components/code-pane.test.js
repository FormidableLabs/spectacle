import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import CodePane from "./code-pane";

describe("<CodePane />", () => {
  test("should render correctly.", () => {
    const context = { styles: { components: { codePane: { pre: {} } } } };
    const source = `
      const myButton = (
        <CustomButton
          style={{ background: '#f00' }}
          onClick={this.action}
        >
         Click Me
        </CustomButton>
      );
    `;
    const wrapper = mount(
      <CodePane
        lang="jsx"
        source={source}
      />,
    { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
