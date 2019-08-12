import React from 'react';
import Deck from '../../src/components/Deck.js';
import Slide from '../../src/components/Slide.js';
import SlideElementWrapper from '../../src/components/SlideElementWrapper';

const TestJs = () => (
  <Deck loop={true}>
    <Slide>
      <div>Hi</div>
      <b>b</b>
    </Slide>
    <Slide>
      <p> Slide 3! </p>
      <SlideElementWrapper elementNum={0}>
        <div>{`Hey, just one "animated" slide element here`}</div>
      </SlideElementWrapper>
    </Slide>
    <Slide>
      <p>{`I'm a static slide element that should always show`}</p>
      <p>{`This means that we don't need a SlideElementWrapper`}</p>
      <SlideElementWrapper elementNum={0}>
        <p slide-element="true"> ZERO Slide 4 x 3! </p>
      </SlideElementWrapper>
      <SlideElementWrapper elementNum={1}>
        <p slide-element="true"> ONE Slide 4 x 3! </p>
      </SlideElementWrapper>
      <SlideElementWrapper elementNum={2}>
        <p slide-element="true"> TWO Slide 4 x 3! </p>
      </SlideElementWrapper>
      <p>{`I'm also a static non-animated "slide element"!`}</p>
    </Slide>
    <div>HEY PHIL. YOU DOUBTED US???</div>
  </Deck>
);

export default TestJs;
