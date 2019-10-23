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
  Grid,
  Notes,
  FullScreen,
  Progress,
  Markdown
} from '../../src/';

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
    template={() => (
      <FlexBox
        justifyContent="space-between"
        position="absolute"
        bottom={0}
        width={1}
      >
        <Box padding="0 1em">
          <FullScreen />
        </Box>
        <Box padding="1em">
          <Progress />
        </Box>
      </FlexBox>
    )}
  >
    <Slide>
      <Heading>Spectacle</Heading>
      <Text>Hello There 🤗</Text>
      <Quote>This is a Formidaquote!</Quote>
      <OrderedList>
        <Appear elementNum={0}>
          <ListItem>This is an</ListItem>
        </Appear>
        <Appear elementNum={1}>
          <ListItem>ordered list</ListItem>
        </Appear>
      </OrderedList>
      <UnorderedList>
        <ListItem>This is an</ListItem>
        <ListItem>unordered list</ListItem>
      </UnorderedList>
      <Notes>
        <p>
          Notes are shown in presenter mode. Open up
          localhost:3000/?presenterMode=true to see them.
        </p>
      </Notes>
    </Slide>
    <Slide>
      <CodePane fontSize={18} language="cpp">
        {cppCodeBlock}
      </CodePane>
      <Notes>
        <p>
          This is a code pane! It can support multiple programming languages.
        </p>
      </Notes>
    </Slide>
    <Slide>
      <Text fontSize="subHeader">Slide 3!</Text>
      <Appear elementNum={0}>
        <Text>{`Hey, just one "animated" slide element here`}</Text>
      </Appear>
    </Slide>
    <Slide>
      <Text>{`I'm a static slide element that should always show`}</Text>
      <Text>{`This means that we don't need a SlideElementWrapper`}</Text>
      <Appear elementNum={0}>
        <Text> ZERO Slide 4 x 3! </Text>
      </Appear>
      <Appear elementNum={1}>
        <Text> ONE Slide 4 x 3! </Text>
      </Appear>
      <Appear elementNum={2}>
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
            <FlexBox key={`formidable-logo-${index}`} flex={1}>
              <Image src={formidableLogo} width={100} />
            </FlexBox>
          ))}
      </Grid>
    </Slide>
    <Slide>
      <Markdown>
        {`
          ### Paying for too much Lambda memory?
          - Yes you are!
          
          \`\`\`js
          fields @timestamp, res.duration
          | filter res.duration > 0
          | sort @timestamp desc
          | limit 20
          | stats min(res.duration), avg(res.duration), max(res.duration) by bin(30m)
          \`\`\`
        `}
      </Markdown>
    </Slide>
    <Markdown containsSlides>
      {`
        ### First MD generated Slide
        ---
        ### Second MD Generated Slide
      `}
    </Markdown>
  </Deck>
);

export default TestJs;
