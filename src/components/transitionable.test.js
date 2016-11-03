import React, { Component } from "react";
import { shallow, mount } from "enzyme";
import { Transitionable, renderTransition } from "./transitionable";
import { VictoryAnimation } from "victory-core";

@Transitionable
class ViewMock extends Component {
  state = { transitioning: true };
  @renderTransition
  render() {
    return (<div>Hello World!</div>);
  }
}

describe("@renderTransition", () => {
  it("should wrap the view component in a VictoryAnimation component", () => {
    const wrapper = shallow(<ViewMock transition={[]} />);
    expect(wrapper.type()).toBe(VictoryAnimation);
  });
});

describe("@Transitionable", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add ReactCSSTransitionGroup lifecycle functions to the decorated class.", () => {
    expect(ViewMock.prototype.componentWillEnter).toBeDefined();
    expect(ViewMock.prototype.componentWillAppear).toBeDefined();
    expect(ViewMock.prototype.componentWillLeave).toBeDefined();
  });

  it("should call getTransitionStyles to get the transition styles when rendered.", () => {
    const wrapper = mount(<ViewMock transition={[]} />);
    wrapper.instance().getTransitionStyles = jest.fn();
    wrapper.update();
    expect(wrapper.instance().getTransitionStyles).toHaveBeenCalled();
  });
});
