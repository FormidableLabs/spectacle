import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  Box,
  Deck,
  FlexBox,
  FullScreen,
  AnimatedProgress,
  MarkdownSlideSet
} from 'spectacle';

// SPECTACLE_CLI_MD_START
import mdContent from './slides.md';
// SPECTACLE_CLI_MD_END

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
      <AnimatedProgress />
    </Box>
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

const Presentation = () => (
  <Deck theme={theme} template={template}>
    <MarkdownSlideSet>{mdContent}</MarkdownSlideSet>
  </Deck>
);

const root = createRoot(document.getElementById('root'));
root.render(<Presentation />);
