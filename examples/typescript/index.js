'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const jsx_runtime_1 = require('react/jsx-runtime');
const spectacle_1 = require('spectacle');
const client_1 = require('react-dom/client');
const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4';
// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  }
};
// SPECTACLE_CLI_THEME_END
// SPECTACLE_CLI_TEMPLATE_START
const template = () =>
  (0, jsx_runtime_1.jsxs)(
    spectacle_1.FlexBox,
    Object.assign(
      {
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        width: 1
      },
      {
        children: [
          (0, jsx_runtime_1.jsx)(
            spectacle_1.Box,
            Object.assign(
              { padding: '0 1em' },
              { children: (0, jsx_runtime_1.jsx)(spectacle_1.FullScreen, {}) }
            )
          ),
          (0, jsx_runtime_1.jsx)(
            spectacle_1.Box,
            Object.assign(
              { padding: '1em' },
              {
                children: (0, jsx_runtime_1.jsx)(
                  spectacle_1.AnimatedProgress,
                  {}
                )
              }
            )
          )
        ]
      }
    )
  );
// SPECTACLE_CLI_TEMPLATE_END
const SlideFragments = () =>
  (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(spectacle_1.Slide, {
        children: (0, jsx_runtime_1.jsx)(spectacle_1.Text, {
          children: 'This is a slide fragment.'
        })
      }),
      (0, jsx_runtime_1.jsxs)(spectacle_1.Slide, {
        children: [
          (0, jsx_runtime_1.jsx)(spectacle_1.Text, {
            children: 'This is also a slide fragment.'
          }),
          (0, jsx_runtime_1.jsx)(spectacle_1.Appear, {
            children: (0, jsx_runtime_1.jsx)(spectacle_1.Text, {
              children: 'This item shows up!'
            })
          }),
          (0, jsx_runtime_1.jsx)(spectacle_1.Appear, {
            children: (0, jsx_runtime_1.jsx)(spectacle_1.Text, {
              children: 'This item also shows up!'
            })
          })
        ]
      })
    ]
  });
const Presentation = () =>
  (0, jsx_runtime_1.jsxs)(
    spectacle_1.Deck,
    Object.assign(
      { theme: theme, template: template },
      {
        children: [
          (0, jsx_runtime_1.jsxs)(spectacle_1.Slide, {
            children: [
              (0, jsx_runtime_1.jsx)(
                spectacle_1.FlexBox,
                Object.assign(
                  { height: '100%' },
                  {
                    children: (0, jsx_runtime_1.jsx)(
                      spectacle_1.SpectacleLogo,
                      { size: 500 }
                    )
                  }
                )
              ),
              (0, jsx_runtime_1.jsxs)(spectacle_1.Notes, {
                children: [
                  'Spectacle supports notes per slide.',
                  (0, jsx_runtime_1.jsxs)('ol', {
                    children: [
                      (0, jsx_runtime_1.jsx)('li', {
                        children: 'Notes can now be HTML markup!'
                      }),
                      (0, jsx_runtime_1.jsx)('li', {
                        children: 'Lists can make it easier to make points.'
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          (0, jsx_runtime_1.jsx)(spectacle_1.Slide, {
            children: (0, jsx_runtime_1.jsxs)(
              spectacle_1.FlexBox,
              Object.assign(
                { height: '100%', flexDirection: 'column' },
                {
                  children: [
                    (0, jsx_runtime_1.jsxs)(
                      spectacle_1.Heading,
                      Object.assign(
                        { margin: '0px', fontSize: '150px' },
                        {
                          children: [
                            '\u2728',
                            (0, jsx_runtime_1.jsx)('i', {
                              children: 'Spectacle'
                            }),
                            ' \u2728'
                          ]
                        }
                      )
                    ),
                    (0, jsx_runtime_1.jsx)(
                      spectacle_1.Heading,
                      Object.assign(
                        { margin: '0px', fontSize: 'h2' },
                        { children: 'A ReactJS Presentation Library' }
                      )
                    ),
                    (0, jsx_runtime_1.jsx)(
                      spectacle_1.Heading,
                      Object.assign(
                        {
                          margin: '0px 32px',
                          color: 'primary',
                          fontSize: 'h3'
                        },
                        {
                          children:
                            'Where you can write your decks in JSX, Markdown, or MDX!'
                        }
                      )
                    )
                  ]
                }
              )
            )
          }),
          (0, jsx_runtime_1.jsxs)(
            spectacle_1.Slide,
            Object.assign(
              {
                transition: {
                  from: {
                    transform: 'scale(0.5) rotate(45deg)',
                    opacity: 0
                  },
                  enter: {
                    transform: 'scale(1) rotate(0)',
                    opacity: 1
                  },
                  leave: {
                    transform: 'scale(0.2) rotate(315deg)',
                    opacity: 0
                  }
                },
                backgroundColor: 'tertiary',
                backgroundImage:
                  'url(https://github.com/FormidableLabs/dogs/blob/main/src/beau.jpg?raw=true)',
                backgroundOpacity: 0.5
              },
              {
                children: [
                  (0, jsx_runtime_1.jsx)(spectacle_1.Heading, {
                    children: 'Custom Backgrounds'
                  }),
                  (0, jsx_runtime_1.jsxs)(spectacle_1.UnorderedList, {
                    children: [
                      (0, jsx_runtime_1.jsx)(spectacle_1.ListItem, {
                        children: (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                          children: 'backgroundColor'
                        })
                      }),
                      (0, jsx_runtime_1.jsx)(spectacle_1.ListItem, {
                        children: (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                          children: 'backgroundImage'
                        })
                      }),
                      (0, jsx_runtime_1.jsx)(spectacle_1.ListItem, {
                        children: (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                          children: 'backgroundOpacity'
                        })
                      }),
                      (0, jsx_runtime_1.jsx)(spectacle_1.ListItem, {
                        children: (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                          children: 'backgroundSize'
                        })
                      }),
                      (0, jsx_runtime_1.jsx)(spectacle_1.ListItem, {
                        children: (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                          children: 'backgroundPosition'
                        })
                      }),
                      (0, jsx_runtime_1.jsx)(spectacle_1.ListItem, {
                        children: (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                          children: 'backgroundRepeat'
                        })
                      })
                    ]
                  })
                ]
              }
            )
          ),
          (0, jsx_runtime_1.jsxs)(spectacle_1.Slide, {
            children: [
              (0, jsx_runtime_1.jsx)(spectacle_1.Heading, {
                children: 'Animated Elements'
              }),
              (0, jsx_runtime_1.jsxs)(spectacle_1.OrderedList, {
                children: [
                  (0, jsx_runtime_1.jsx)(spectacle_1.Appear, {
                    children: (0, jsx_runtime_1.jsx)(spectacle_1.ListItem, {
                      children: 'Elements can animate in!'
                    })
                  }),
                  (0, jsx_runtime_1.jsx)(spectacle_1.Appear, {
                    children: (0, jsx_runtime_1.jsx)(spectacle_1.ListItem, {
                      children: 'Out of order'
                    })
                  }),
                  (0, jsx_runtime_1.jsx)(
                    spectacle_1.Appear,
                    Object.assign(
                      { priority: 0 },
                      {
                        children: (0, jsx_runtime_1.jsxs)(
                          spectacle_1.ListItem,
                          {
                            children: [
                              'Just identify the order with the prop ',
                              (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                                children: 'priority'
                              }),
                              '!'
                            ]
                          }
                        )
                      }
                    )
                  )
                ]
              })
            ]
          }),
          (0, jsx_runtime_1.jsxs)(spectacle_1.Slide, {
            children: [
              (0, jsx_runtime_1.jsxs)(spectacle_1.FlexBox, {
                children: [
                  (0, jsx_runtime_1.jsx)(spectacle_1.Text, {
                    children: 'These'
                  }),
                  (0, jsx_runtime_1.jsx)(spectacle_1.Text, {
                    children: 'Text'
                  }),
                  (0, jsx_runtime_1.jsx)(
                    spectacle_1.Text,
                    Object.assign({ color: 'secondary' }, { children: 'Items' })
                  ),
                  (0, jsx_runtime_1.jsx)(
                    spectacle_1.Text,
                    Object.assign({ fontWeight: 'bold' }, { children: 'Flex' })
                  )
                ]
              }),
              (0, jsx_runtime_1.jsxs)(
                spectacle_1.Grid,
                Object.assign(
                  { gridTemplateColumns: '1fr 2fr', gridColumnGap: 15 },
                  {
                    children: [
                      (0, jsx_runtime_1.jsx)(
                        spectacle_1.Box,
                        Object.assign(
                          { backgroundColor: 'primary' },
                          {
                            children: (0, jsx_runtime_1.jsx)(
                              spectacle_1.Text,
                              Object.assign(
                                { color: 'secondary' },
                                { children: 'Single-size Grid Item' }
                              )
                            )
                          }
                        )
                      ),
                      (0, jsx_runtime_1.jsx)(
                        spectacle_1.Box,
                        Object.assign(
                          { backgroundColor: 'secondary' },
                          {
                            children: (0, jsx_runtime_1.jsx)(spectacle_1.Text, {
                              children: 'Double-size Grid Item'
                            })
                          }
                        )
                      )
                    ]
                  }
                )
              ),
              (0, jsx_runtime_1.jsx)(
                spectacle_1.Grid,
                Object.assign(
                  {
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridTemplateRows: '1fr 1fr 1fr',
                    gridRowGap: 1
                  },
                  {
                    children: Array(9)
                      .fill('')
                      .map((_, index) =>
                        (0, jsx_runtime_1.jsx)(
                          spectacle_1.FlexBox,
                          Object.assign(
                            { paddingTop: 0, flex: 1 },
                            {
                              children: (0, jsx_runtime_1.jsx)(
                                spectacle_1.Image,
                                { src: formidableLogo, width: 100 }
                              )
                            }
                          ),
                          `formidable-logo-${index}`
                        )
                      )
                  }
                )
              )
            ]
          }),
          (0, jsx_runtime_1.jsx)(SlideFragments, {}),
          (0, jsx_runtime_1.jsxs)(spectacle_1.Slide, {
            children: [
              (0, jsx_runtime_1.jsx)(
                spectacle_1.CodePane,
                Object.assign(
                  { language: 'jsx' },
                  {
                    children: `
        import { createClient, Provider } from 'urql';

        const client = createClient({ url: 'https://0ufyz.sse.codesandbox.io' });

        const App = () => (
          <Provider value={client}>
            <Todos />
          </Provider>
        );
        `
                  }
                )
              ),
              (0, jsx_runtime_1.jsx)(spectacle_1.Box, { height: 20 }),
              (0, jsx_runtime_1.jsx)(
                spectacle_1.CodePane,
                Object.assign(
                  { language: 'java', showLineNumbers: false },
                  {
                    children: `
        public class NoLineNumbers {
          public static void main(String[] args) {
            System.out.println("Hello");
          }
        }
        `
                  }
                )
              )
            ]
          }),
          (0, jsx_runtime_1.jsx)('div', {
            children: (0, jsx_runtime_1.jsx)(spectacle_1.Slide, {
              children: (0, jsx_runtime_1.jsx)(spectacle_1.Heading, {
                children: 'This is a slide embedded in a div'
              })
            })
          }),
          (0, jsx_runtime_1.jsx)(
            spectacle_1.MarkdownSlide,
            Object.assign(
              { componentProps: { color: 'yellow' } },
              {
                children: `
        # This is a Markdown Slide

        - You can pass props down to all elements on the slide.
        - Just use the \`componentProps\` prop.
        `
              }
            )
          ),
          (0, jsx_runtime_1.jsx)(
            spectacle_1.MarkdownSlide,
            Object.assign(
              { animateListItems: true },
              {
                children: `
       # This is also a Markdown Slide

       It uses the \`animateListItems\` prop.

       - Its list items...
       - ...will appear...
       - ...one at a time.
      `
              }
            )
          ),
          (0, jsx_runtime_1.jsx)(spectacle_1.Slide, {
            children: (0, jsx_runtime_1.jsxs)(
              spectacle_1.Grid,
              Object.assign(
                {
                  gridTemplateColumns: '50% 50%',
                  gridTemplateRows: '50% 50%',
                  height: '100%'
                },
                {
                  children: [
                    (0, jsx_runtime_1.jsx)(
                      spectacle_1.FlexBox,
                      Object.assign(
                        { alignItems: 'center', justifyContent: 'center' },
                        {
                          children: (0, jsx_runtime_1.jsx)(
                            spectacle_1.Heading,
                            { children: 'This is a 4x4 Grid' }
                          )
                        }
                      )
                    ),
                    (0, jsx_runtime_1.jsx)(
                      spectacle_1.FlexBox,
                      Object.assign(
                        { alignItems: 'center', justifyContent: 'center' },
                        {
                          children: (0, jsx_runtime_1.jsx)(
                            spectacle_1.Text,
                            Object.assign(
                              { textAlign: 'center' },
                              {
                                children:
                                  'With all the content aligned and justified center.'
                              }
                            )
                          )
                        }
                      )
                    ),
                    (0, jsx_runtime_1.jsx)(
                      spectacle_1.FlexBox,
                      Object.assign(
                        { alignItems: 'center', justifyContent: 'center' },
                        {
                          children: (0, jsx_runtime_1.jsxs)(
                            spectacle_1.Text,
                            Object.assign(
                              { textAlign: 'center' },
                              {
                                children: [
                                  'It uses Spectacle ',
                                  (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                                    children: '<Grid />'
                                  }),
                                  ' and',
                                  ' ',
                                  (0, jsx_runtime_1.jsx)(spectacle_1.CodeSpan, {
                                    children: '<FlexBox />'
                                  }),
                                  ' components.'
                                ]
                              }
                            )
                          )
                        }
                      )
                    ),
                    (0, jsx_runtime_1.jsx)(
                      spectacle_1.FlexBox,
                      Object.assign(
                        { alignItems: 'center', justifyContent: 'center' },
                        {
                          children: (0, jsx_runtime_1.jsx)(spectacle_1.Box, {
                            width: 200,
                            height: 200,
                            backgroundColor: 'secondary'
                          })
                        }
                      )
                    )
                  ]
                }
              )
            )
          }),
          (0, jsx_runtime_1.jsx)(spectacle_1.MarkdownSlideSet, {
            children: `
        # This is the first slide of a Markdown Slide Set
        ---
        # This is the second slide of a Markdown Slide Set
        `
          }),
          (0, jsx_runtime_1.jsx)(spectacle_1.SlideLayout.List, {
            title: 'Slide layouts!',
            items: ['Two-column', 'Lists', 'And more!'],
            animateListItems: true
          })
        ]
      }
    )
  );
const root = (0, client_1.createRoot)(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(Presentation, {}));
