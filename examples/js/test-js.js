import React from 'react';
import {
  Deck,
  Slide,
  Appear,
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
  <Deck
    template={({ numberOfSlides, slideNumber }) => (
      <FlexBox
        justifyContent="space-between"
        position="absolute"
        bottom={0}
        width={1}
      >
        <Text fontSize={12}>
          Slide {slideNumber} of {numberOfSlides}
        </Text>
        <Box padding={10}>
          <Image src={formidableLogo} width={100} />
        </Box>
      </FlexBox>
    )}
  >
    <Slide>
      <Heading>Spectacle</Heading>
      <Text>Hello There 🤗</Text>
      <Quote>This is a Formidaquote!</Quote>
      <OrderedList>
        <Appear elementNum={1}>
          <ListItem>This is an</ListItem>
        </Appear>
        <Appear elementNum={2}>
          <ListItem>ordered list</ListItem>
        </Appear>
      </OrderedList>
      <UnorderedList>
        <ListItem>This is an</ListItem>
        <ListItem>unordered list</ListItem>
      </UnorderedList>
    </Slide>
    <Slide>
      <CodePane fontSize={18} language="cpp">
        {cppCodeBlock}
      </CodePane>
    </Slide>
    <Slide>
      <Text fontSize="subHeader">Slide 3!</Text>
      <Appear elementNum={1}>
        <Text>{`Hey, just one "animated" slide element here`}</Text>
      </Appear>
    </Slide>
    <Slide>
      <Text>{`I'm a static slide element that should always show`}</Text>
      <Text>{`This means that we don't need a SlideElementWrapper`}</Text>
      <Appear elementNum={1}>
        <Text> ZERO Slide 4 x 3! </Text>
      </Appear>
      <Appear elementNum={2}>
        <Text> ONE Slide 4 x 3! </Text>
      </Appear>
      <Appear elementNum={3}>
        <Text> TWO Slide 4 x 3! </Text>
      </Appear>
      <Text>{`I'm also a static non-animated "slide element"!`}</Text>
    </Slide>
    <Slide>
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
          .map((_, index) => (
            <FlexBox key={`formidable-logo-${index}`}>
              <Image src={formidableLogo} width={100} />
            </FlexBox>
          ))}
      </Grid>
    </Slide>
  </Deck>
);

export default TestJs;
