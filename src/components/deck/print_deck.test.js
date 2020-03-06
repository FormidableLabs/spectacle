import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PrintDeck } from './print-deck';

Enzyme.configure({ adapter: new Adapter() });

describe('PrintDeck', () => {
  it('Renders children', () => {
    const children = [<div key="hi">Blah</div>];
    const component = shallow(<PrintDeck>{children}</PrintDeck>);
    expect(component.children('div').length).toBe(1);
  });
});
