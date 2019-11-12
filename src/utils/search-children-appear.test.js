import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Appear from '../components/appear';

import searchChildrenForAppear from './search-children-appear';

Enzyme.configure({ adapter: new Adapter() });

describe('search children for appear', () => {
  it('returns 0 when there are no children', () => {
    expect(searchChildrenForAppear([])).toEqual(0);
  });

  it('returns 0 when there are no appear elements', () => {
    expect(
      searchChildrenForAppear([
        <div key={0}>not an appear element</div>,
        <div key={1}>nor me</div>
      ])
    ).toEqual(0);
  });

  it('returns the amount of appear elements', () => {
    expect(
      searchChildrenForAppear([
        <div key={0}>notan appear element</div>,
        <Appear key={1} elementNum={1}>
          But I am
        </Appear>,
        <div key={2} />,
        <Appear elementNum={2} key={3}>
          Another appear element
        </Appear>
      ])
    ).toEqual(2);
  });
});
