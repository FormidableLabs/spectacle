import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import TableHeaderItem from "./table-header-item";

describe("<TableHeaderItem />", () => {
  test("should render correctly", () => {
    const context = { styles: { components: { tableHeaderItem: {
      color: "#e01"
    } } } };
    const wrapper = mount((
      <TableHeaderItem>Header Text</TableHeaderItem>
    ), { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
