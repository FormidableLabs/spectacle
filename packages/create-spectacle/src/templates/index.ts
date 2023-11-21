type IndexTemplateOptions = {
  name: string;
  usesMarkdown: boolean;
};

export const indexTemplate = (options: IndexTemplateOptions) =>
  `import React from 'react';
import { createRoot } from 'react-dom/client';
import { Slide, Deck, FlexBox, Heading, SpectacleLogo, Box, FullScreen, AnimatedProgress, MarkdownSlideSet } from 'spectacle';
${options.usesMarkdown ? `import mdContent from './slides.md';` : ''}

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

const Presentation = () => (
  <Deck template={template}>
    ${
      options.usesMarkdown
        ? `<MarkdownSlideSet>{mdContent}</MarkdownSlideSet>`
        : `
    <Slide>
      <FlexBox height="100%">
        <Heading>${options.name}</Heading>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%">
        <Heading fontSize="h2">Made with</Heading>
        <SpectacleLogo size={300} />
      </FlexBox>
    </Slide>
    `
    }
  </Deck>
);

createRoot(document.getElementById('app')!).render(<Presentation />);
`;
