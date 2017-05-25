import MarkdownSlides from './markdown-slides';
import React from 'react';
import { shallow } from 'enzyme';

describe('MarkdownSlides', () => {
  test('should render correctly when using tagged template literals', () => {
    const wrapper = shallow(
      <div>
        {MarkdownSlides`
## Slide 1 Title
---
## Slide 2 Title
        `}
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render correctly when using tagged template literals and string interpolation', () => {
    const content = '**bold**';
    const wrapper = shallow(
      <div>
        {MarkdownSlides`
## Slide 1 Title
This text is ${content}.
---
## Slide 2 Title
        `}
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render correctly when using function syntax', () => {
    const markdownContent = `
## Slide A Title
---
## Slide B Title
    `;
    const markdownSlides = MarkdownSlides;
    const wrapper = shallow(
      <div>
        {markdownSlides(markdownContent)}
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
