type IndexTemplateOptions = {
  name: string;
  usesMarkdown: boolean;
};

const content = {
  reactImports() {
    return `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Deck, DefaultTemplate, Slide, FlexBox, Heading, SpectacleLogo } from 'spectacle'
    `;
  },

  mdImports() {
    return `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Deck, DefaultTemplate, MarkdownSlideSet } from 'spectacle';
import mdContent from './slides.md';
    `;
  },

  reactBody(name: string) {
    return `
    <Slide>
      <FlexBox height="100%">
        <Heading>${name}</Heading>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%">
        <Heading fontSize="h2">Made with</Heading>
        <SpectacleLogo size={300} />
      </FlexBox>
    </Slide>
    `
      .substring(1)
      .trim();
  },

  mdBody() {
    return `
    <MarkdownSlideSet>{mdContent}</MarkdownSlideSet>
    `
      .substring(1)
      .trim();
  }
};

export const indexTemplate = (options: IndexTemplateOptions) =>
  `
${(() => {
  if (options.usesMarkdown) {
    return content.mdImports();
  }
  return content.reactImports();
})().trim()}

const Presentation = () => (
  <Deck template={() => <DefaultTemplate />}>
    ${(() => {
      if (options.usesMarkdown) {
        return content.mdBody();
      }
      return content.reactBody(options.name);
    })()}
  </Deck>
);

createRoot(document.getElementById('app')!).render(<Presentation />);
`.trim();
