import React from 'react';
import {
  Deck,
  Slide,
  SlideElementWrapper,
  CodePane,
  FlexBox,
  Box,
  Image,
  Heading,
  ListItem,
  OrderedList,
  Quote,
  Text,
  UnorderedList,
  Grid
} from '../../src/components';

const formidableLogo = require('./formidable.png');
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
      <Heading>Spectacle</Heading>
      <Text>Hello There 🤗</Text>
      <Quote>This is a Formidaquote!</Quote>
      <OrderedList>
        <ListItem>This is an</ListItem>
        <ListItem>ordered list</ListItem>
      </OrderedList>
      <UnorderedList>
        <ListItem>This is an</ListItem>
        <ListItem>unordered list</ListItem>
      </UnorderedList>
    </Slide>
    <Slide slideNum={2}>
      <CodePane fontSize={18} language="cpp">
        {cppCodeBlock}
      </CodePane>
    </Slide>
    <Slide slideNum={3}>
      <Text fontSize="subHeader">Slide 3!</Text>
      <SlideElementWrapper elementNum={1}>
        <Text>{`Hey, just one "animated" slide element here`}</Text>
      </SlideElementWrapper>
    </Slide>
    <Slide slideNum={4}>
      <Text>{`I'm a static slide element that should always show`}</Text>
      <Text>{`This means that we don't need a SlideElementWrapper`}</Text>
      <SlideElementWrapper elementNum={1}>
        <Text> ZERO Slide 4 x 3! </Text>
      </SlideElementWrapper>
      <SlideElementWrapper elementNum={2}>
        <Text> ONE Slide 4 x 3! </Text>
      </SlideElementWrapper>
      <SlideElementWrapper elementNum={3}>
        <Text> TWO Slide 4 x 3! </Text>
      </SlideElementWrapper>
      <Text>{`I'm also a static non-animated "slide element"!`}</Text>
    </Slide>
    <Slide slideNum={5}>
      <FlexBox>
        <Text>These</Text>
        <Text>Text</Text>
        <Text color="secondary">Items</Text>
        <Text fontWeight="bold">Flex</Text>
      </FlexBox>
      <Grid gridTemplateColumns="1fr 2fr" gridColumnGap={15}>
        <Box backgroundColor="primary">
          <Text color="secondary">Single-size Grid Item</Text>
        </Box>
        <Box backgroundColor="secondary">
          <Text>Double-size Grid Item</Text>
        </Box>
      </Grid>
      <Heading>Lots of Formidables!</Heading>
      <Grid
        gridTemplateColumns="1fr 1fr 1fr"
        gridTemplateRows="1fr 1fr 1fr"
        alignItems="center"
        justifyContent="center"
        gridRowGap={15}
      >
        {Array(9)
          .fill('')
          .map(index => (
            <FlexBox key={`formidable-logo-${index}`}>
              <Image src={formidableLogo} width={100} />
            </FlexBox>
          ))}
      </Grid>
    </Slide>
  </Deck>
);

export default TestJs;
