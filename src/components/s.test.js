import S from "./s";
import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

describe("<S />", () => {
  test("should underline text when specified", () => {
    const context = { styles: { components: { s: {
      strikethrough: { color: "#ff0" }
    } } } };
    const wrapper = mount(<S type="strikethrough">Don’t read this!</S>, { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should bold text when specified", () => {
    const context = { styles: { components: { s: {
      bold: { color: "#ff0" }
    } } } };
    const wrapper = mount(<S type="bold">You should read this!</S>, { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should underline text when specified", () => {
    const context = { styles: { components: { s: {
      underline: { color: "#ff0" }
    } } } };
    const wrapper = mount(<S type="underline">This text is underlined!</S>, { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should italicize text when specified", () => {
    const context = { styles: { components: { s: {
      italic: { color: "#ff0" }
    } } } };
    const wrapper = mount(<S type="italic">This text is italicized!</S>, { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  test("should not require a type", () => {
    const context = { styles: { components: { s: {} } } };
    expect(() => {
      const wrapper = mount(<S>This text is normal.</S>, { context });
    }).not.toThrow();
  });

  test("should allow custom styling", () => {
    const context = { styles: {
      colors: {
        magenta: "#ff00ff"
      },
      components: { s: {} }
    } };
    const wrapper = mount(<S textColor="magenta">This text is magenta!</S>, { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
