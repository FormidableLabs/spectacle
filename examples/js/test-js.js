import React from 'react';
import Deck from '../../src/components/deck.js';
import Slide from '../../src/components/slide.js';
import SlideElementWrapper from '../../src/components/slide-element-wrapper';
import CodePane from '../../src/components/code-pane';

const reactJSCodeBlock = `export default function CodePane(props) {
  return (
    <Highlight
      {...defaultProps}
      code={props.children}
      language={props.language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}`;

const cppCodeBlock = `#include <iostream>

int main()
{
  auto curried_add = [](int x) -> function<int(int)> { return [=](int y) { return x + y; }; };
  
  auto answer = curried_add(7)(8);
  std::cout << answer << std::endl;
  
  return 0;
}`;

const TestJs = () => (
  <Deck>
    <Slide slideNum={1}>
      <CodePane language="jsx">{reactJSCodeBlock}</CodePane>
    </Slide>
    <Slide slideNum={2}>
      <CodePane fontSize={18} language="cpp">
        {cppCodeBlock}
      </CodePane>
    </Slide>
    <Slide slideNum={3}>
      <p> Slide 3! </p>
      <SlideElementWrapper elementNum={1}>
        <div>{`Hey, just one "animated" slide element here`}</div>
      </SlideElementWrapper>
    </Slide>
    <Slide slideNum={4}>
      <p>{`I'm a static slide element that should always show`}</p>
      <p>{`This means that we don't need a SlideElementWrapper`}</p>
      <SlideElementWrapper elementNum={1}>
        <p> ZERO Slide 4 x 3! </p>
      </SlideElementWrapper>
      <SlideElementWrapper elementNum={2}>
        <p> ONE Slide 4 x 3! </p>
      </SlideElementWrapper>
      <SlideElementWrapper elementNum={3}>
        <p> TWO Slide 4 x 3! </p>
      </SlideElementWrapper>
      <p>{`I'm also a static non-animated "slide element"!`}</p>
    </Slide>
    <div>HEY PHIL. YOU DOUBTED US???</div>
  </Deck>
);

export default TestJs;
