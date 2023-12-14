type IndexTemplateOptions = {
  name: string;
  usesMarkdown: boolean;
};

const tsxImports = `
import { Deck, DefaultTemplate, Slide, FlexBox, Heading, SpectacleLogo } from 'spectacle';
`;

const mdImports = `
import { Deck, DefaultTemplate, MarkdownSlideSet } from 'spectacle';
import mdContent from './slides.md';
`;

export const indexTemplate = (options: IndexTemplateOptions) =>
  `import React from 'react';
import { createRoot } from 'react-dom/client';
${(options.usesMarkdown ? mdImports : tsxImports).trim()}

const Presentation = () => (
  <Deck template={() => <DefaultTemplate />}>
    ${(options.usesMarkdown
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
    ).trim()}
  </Deck>
);

createRoot(document.getElementById('app')!).render(<Presentation />);
`;
