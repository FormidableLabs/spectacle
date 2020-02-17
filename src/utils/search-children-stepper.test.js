import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Stepper from '../components/stepper';

import searchChildrenForStepper from './search-children-stepper';

Enzyme.configure({ adapter: new Adapter() });

describe('search children for stepper', () => {
  it('returns 0 when there are no children', () => {
    expect(searchChildrenForStepper([])).toEqual(0);
  });

  it('returns 0 when there are no stepper elements', () => {
    expect(
      searchChildrenForStepper([
        <div key={0}>not a stepper element</div>,
        <div key={1}>nor me</div>
      ])
    ).toEqual(0);
  });

  it('returns the amount of stepper elements', () => {
    expect(
      searchChildrenForStepper([
        <div key={0}>not a stepper element</div>,
        <Stepper key={1} values={[[1, 1]]}>
          {() => 'But I have 1 value'}
        </Stepper>,
        <div key={2} />,
        <Stepper
          key={3}
          values={[
            [1, 1],
            [2, 2],
            [3, 3]
          ]}
        >
          {() => 'And I have 3 values'}
        </Stepper>
      ])
    ).toEqual(4);
  });
});
