import { createElement } from 'react';
import { render } from 'react-dom';

import { Deck, FlexBox, Markdown, FullScreen, Progress, Box } from 'spectacle';

// SPECTACLE_CLI_THEME_START
const theme = {};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () =>
  createElement(
    FlexBox,
    {
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 0,
      width: 1
    },
    [
      createElement(
        Box,
        { padding: 10, key: 'progress-templ' },
        createElement(Progress)
      ),
      createElement(
        Box,
        { padding: 10, key: 'fullscreen-templ' },
        createElement(FullScreen)
      )
    ]
  );
// SPECTACLE_CLI_TEMPLATE_END

// SPECTACLE_CLI_MD_START
const mdContent = require('./slides.md');
// SPECTACLE_CLI_MD_END

const MDSlides = () =>
  createElement(
    Deck,
    {
      loop: true,
      theme,
      template
    },
    createElement(Markdown, { containsSlides: true }, mdContent)
  );

render(createElement(MDSlides, null), document.getElementById('root'));
