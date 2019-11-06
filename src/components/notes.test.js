import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Notes from './Notes';

Enzyme.configure({ adapter: new Adapter() });

const mockedUseContext = (React.useContext = jest.fn());

describe('Notes', () => {
  const setNotes = jest.fn();
  it('Calls setNotes with children value', () => {
    mockedUseContext.mockReturnValue({
      actions: {
        setNotes
      }
    });
    mount(<Notes>{'Some Notes'}</Notes>);
    expect(setNotes).toHaveBeenCalledWith('Some Notes');
  });
});
