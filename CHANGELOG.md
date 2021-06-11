# Changelog

## Unreleased

- Fixed `showLineNumbers` and theme sizing for `<CodePane />`

## 8.2.0

- Added support for custom slide and deck transitions
- Added Fade and Slide transition objects as built-in transitions
- Updated JS example with spinning custom slide transition

## 8.1.0

- Allow raw HTML in Markdown content.
- Added missing export and type for `useMousetrap`
- Removed unused `useAnimatedSteps` hook.

## 8.0.1

- Fixed navigation by swiping on touch-devices

## 8.0.0

- Removed auto-importing every Prism theme for CodePane to reduce overall bundle size
- The CodePane theme prop now accepts a pre-defined or custom Prism object

## 7.1.5

- Added missing type for `indentNormalizer` function.

## 7.1.4

- Fixed reference for `FlexBox` type in ambient type declarations.

## 7.1.3

- Add support for `listStyleType` in `UnorderedList` and `OrderedList` components.

## 7.1.2

- Fixed issue with `animateListItems` in Markdown components that was causing lists to not show up at all.

## 7.1.1

- Exports `SlideContext`, `DeckContext`, and `defaultTheme`
- Fixes required child prop for `Notes`

## 7.1.0

- Added animateListItems prop for Markdown, MarkdownSlide, and MarkdownSlideSet components, enabling animating list items via Markdown components.
- Added componentProps prop for Markdown, MarkdownSlide, and MarkdownSlideSet components, enabling passing a set of props down to each component rendered within a Markdown component.

## 7.0.4

- Fixed page-size for export to PDF mode

## 7.0.3

- Fixed margin sizing for `Link` when using Markdown.

## 7.0.2

- Fixed usage of Node API, `setImmediate`, and replaced with a browser API.

## 7.0.1

- Update one-page to use v7 of Spectacle

## 7.0.0

- Updated TypeScript type definitions
- Fixed duplication final slide in Presnter Mode

## 7.0.0-beta.5 (1/21/2021)

- Fixed Notes for Markdown components

## 7.0.0-beta.4 (1/13/2021)

- Props for Page Layout, Orientation, and PPI for Print and Export mode

## 7.0.0-beta.3 (12/28/2020)

- Support for Print and Export Modes
- Support for keyboard shortcuts to change between modes

## 7.0.0-beta.2 (12/9/2020)

- Support for multiple lines or single lines for highlight ranges in <CodePane>
- Overview Mode now allows for selecting or tabbing through slides

## 7.0.0-beta.1 (11/24/2020)

- Core refactor of navigation and slide management to fix bugs around nested slide sets
- Rewrite of <CodePane> to fix line-by-line highlighting
- Supports nested slides inside JSX fragments and HTML tags like div
- New <MarkdownSlide> and <MarkdownSlideSet> for MD-based content
- Slides in Markdown are now tightly integrated within the deck and can be mixed within regular slides
- Presenter Mode defaults back to Spectacle 5.0 experience of dual-browser mode
- Notes can now contain HTML markup

## 6.2.0 (06-17-2020)

- Fix presenter mode so the next element is displayed, not just the next Slide.
  [#924](https://github.com/FormidableLabs/spectacle/pull/924)
- Allow for user-supplied indentation size in the CodePane.
  [#908](https://github.com/FormidableLabs/spectacle/pull/908)

## 6.1.0 (05-28-2020)

- Remove references to PropTypes from type definitions.
  [#907](https://github.com/FormidableLabs/spectacle/pull/907)
- Enhance hot key support for Linux users.
  [#905](https://github.com/FormidableLabs/spectacle/pull/905)

## 6.0.3 (05-11-2020)

- Fix keyboard toggles for both MacOS and Windows.
  [#893](https://github.com/FormidableLabs/spectacle/pull/893)
- Documentation updates.
  [#894](https://github.com/FormidableLabs/spectacle/pull/894)
- Add support for mobile navigation of slides.
  [#876](https://github.com/FormidableLabs/spectacle/pull/876)

## 6.0.2 (04-10-2020)

- Allow for `props.fontSize` to override the theme's monospace font size in `CodePane`.
  [#875](https://github.com/FormidableLabs/spectacle/pull/875)
- Surface `textDecoration` prop from styled-system for `Link`s.
  [#869](https://github.com/FormidableLabs/spectacle/pull/869)

## 6.0.1 (03-18-2020)

- Fix broken doc links.
  [#859](https://github.com/FormidableLabs/spectacle/pull/859), [#862](https://github.com/FormidableLabs/spectacle/pull/862)
- Add a live preview to the docs lander.
  [#860](https://github.com/FormidableLabs/spectacle/pull/860)
- Fix CodePane so user-supplied themes are surfaced.
  [#866](https://github.com/FormidableLabs/spectacle/pull/866)
- Fix nested Appears.
  [#864](https://github.com/FormidableLabs/spectacle/pull/864)

## 6.0.0 (03-06-2020)

- Expand custom background support by adding `Background` props to the `Slide` component, along with `backgroundOpacity`.
  [#849](https://github.com/FormidableLabs/spectacle/pull/849)
- Add `Stepper`, allowing for code range highlighting/scrolling within CodePane.
  [#843](https://github.com/FormidableLabs/spectacle/pull/843)

## 6.0.0-alpha.8 (02-20-2020)

- Update `examples/one-page.html` to `examples/js/index.js` with new script helper.
- Add support for Deck or Slide-level transitions.
- Add default transitions for Fade, Slide, and None.
- Fixes Full Screen component for Chrome/FF, adds support for Safari.
- Added support for dual-browser tab mode for presenter mode in all browsers.

## 6.0.0-alpha.7 (01-27-2020)

- Fix `one-page.html` closing tags.

## 6.0.0-alpha.6 (01-27-2020)

- Fix `one-page.html` unpkg script links.

## 6.0.0-alpha.5 (01-27-2020)

- Add color props support to Flex Box.
  [#816](https://github.com/FormidableLabs/spectacle/issues/816)

## 6.0.0-alpha.4 (01-27-2020)

- Move around internal examples, and publish some for `spectacle-cli` usage.
- Use top-center layout defaults for Spectacle. Drop `autoLayout` prop.
- Add `border` styled-system props to `FlexBox` and `Box`.

## 6.0.0-alpha.3 (11-04-2019)

- Fixes overflow issue for presenter mode in Chrome.

## 6.0.0-alpha.1 (11-02-2019)

- First release of the Spectacle rewrite MVP.
- Support for:
  - Overview mode. [#731](https://github.com/FormidableLabs/spectacle/pull/731)
  - Presenter mode. [#724](https://github.com/FormidableLabs/spectacle/pull/724)
  - Presenter notes. [#762](https://github.com/FormidableLabs/spectacle/pull/762)
  - Base themeing. [#717](https://github.com/FormidableLabs/spectacle/pull/717)
  - In-browser resizing. [#721](https://github.com/FormidableLabs/spectacle/pull/721)
  - CodePane. [#712](https://github.com/FormidableLabs/spectacle/pull/712)
  - URL-based navigation. [#711](https://github.com/FormidableLabs/spectacle/pull/711)
  - MDX slides. [#689](https://github.com/FormidableLabs/spectacle/pull/689)
  - Keyboard controls. [#760](https://github.com/FormidableLabs/spectacle/pull/760)
  - Print & Export mode. [#758](https://github.com/FormidableLabs/spectacle/pull/758)
  - A Progress indicator. [#726](https://github.com/FormidableLabs/spectacle/pull/726)
