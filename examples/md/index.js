import React from 'react';
import { render } from 'react-dom';

import { Deck, FlexBox, Markdown, FullScreen, Progress, Box } from 'spectacle';

// SPECTACLE_CLI_THEME_START
const theme = {};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
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
);
// SPECTACLE_CLI_TEMPLATE_END

// SPECTACLE_CLI_MD_START
import mdContent from './slides.md';
// SPECTACLE_CLI_MD_END

// TODO REMOVE
console.log('TODO HERE', { mdContent });

const MDSlides = () => (
  <Deck loop={true} theme template>
    <Markdown containsSlides={true}>{mdContent}</Markdown>
  </Deck>
);

render(<MDSlides />, document.getElementById('root'));
