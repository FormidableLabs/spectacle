# Changelog

## 10.2.1

### Patch Changes

- Ensure "PacMan" animation works in Safari ([#1352](https://github.com/FormidableLabs/spectacle/pull/1352))

## 10.2.0

### Minor Changes

- Add `FitText` typography component. ([#1342](https://github.com/FormidableLabs/spectacle/pull/1342))

## 10.1.8

### Patch Changes

- security update: increment ts-jest and babel/core ([#1321](https://github.com/FormidableLabs/spectacle/pull/1321))

- security update: update query-string to fix decode-uri-component vulnerability in 0.2.0 ([#1319](https://github.com/FormidableLabs/spectacle/pull/1319))

## 10.1.7

### Patch Changes

- Fix print mode not showing content for Markdown and Animated item slides. ([#1299](https://github.com/FormidableLabs/spectacle/pull/1299))

## 10.1.6

### Patch Changes

- Push for a new esm build ([#1295](https://github.com/FormidableLabs/spectacle/pull/1295))

## 10.1.5

### Patch Changes

- Fixed deck transitions for presenter mode, added test coverage around deck reducer. ([#1290](https://github.com/FormidableLabs/spectacle/pull/1290))

## 10.1.4

### Patch Changes

- Allow react-syntax-highlighter prism theme imports to have more tolerant `.default` behavior with CJS vs. ESM. ([#1277](https://github.com/FormidableLabs/spectacle/pull/1277))

## 10.1.3

### Patch Changes

- Remove GA Wireit caching from release builds. ([#1273](https://github.com/FormidableLabs/spectacle/pull/1273))

## 10.1.1

### Patch Changes

- Re-run 10.1.0 release to fix wireit cache failure. ([#1270](https://github.com/FormidableLabs/spectacle/pull/1270))

## 10.1.0

### Minor Changes

- Use tsup (instead of webpack) for browser/umd build ([#1268](https://github.com/FormidableLabs/spectacle/pull/1268))

- Export all code pane themes as part of the Spectacle package. ([#1266](https://github.com/FormidableLabs/spectacle/pull/1266))

### Patch Changes

- Bumped dependency of one-page.html to v10 ([#1265](https://github.com/FormidableLabs/spectacle/pull/1265))

## 10.0.0

### Major Changes

- Added support for App Dir and SSR. Updated doc examples. ([#1263](https://github.com/FormidableLabs/spectacle/pull/1263))
  Added default template component containing the full screen and animated progress indicator.
  Set peer dependency on React to v18

## 9.7.2

### Patch Changes

- Fixed print CSS for container components. Update PRR for docs. ([#1261](https://github.com/FormidableLabs/spectacle/pull/1261))

## 9.7.1

### Patch Changes

- Setup NPM Provenance ([#1258](https://github.com/FormidableLabs/spectacle/pull/1258))

## 9.7.0

### Minor Changes

- provide better error messages when useSteps or stepper components are used in the wrong context ([#1240](https://github.com/FormidableLabs/spectacle/pull/1240))

- feat: Add Image Slide Layouts: Vertical, Horizontal, ThreeUp, Fullbleed. ([#1221](https://github.com/FormidableLabs/spectacle/pull/1221))

### Patch Changes

- autoPlayLoop now works as intended ([#1239](https://github.com/FormidableLabs/spectacle/pull/1239))

- prevent theme.backdropStyle styles for background from being overridden ([#1231](https://github.com/FormidableLabs/spectacle/pull/1231))

- Fix lib babel output to correctly produce CommonJS and not ESM (see [#1250](https://github.com/FormidableLabs/spectacle/issues/1250)). ([#1251](https://github.com/FormidableLabs/spectacle/pull/1251))

## 9.6.0

### Minor Changes

- exports the `useSteps` hook ([#1225](https://github.com/FormidableLabs/spectacle/pull/1225))

## 9.5.1

### Patch Changes

- Fixed Notes node tree generation inside Markdown component. ([#1219](https://github.com/FormidableLabs/spectacle/pull/1219))

## 9.5.0

### Minor Changes

- feat: Add new Slide Layouts: Section, Statement, Big fact, Quote to expand basic layout creation. ([#1209](https://github.com/FormidableLabs/spectacle/pull/1209))

* feat: Add single and multiple code pane Slide Layouts with options. ([#1217](https://github.com/FormidableLabs/spectacle/pull/1217))

## 9.4.0

### Minor Changes

- Utilize `Kbar` to allow users to quickly search and use the current commands Spectacle supports within presentations. Fixes #1115 ([#1161](https://github.com/FormidableLabs/spectacle/pull/1161))

### Patch Changes

- (fix [#1171](https://github.com/FormidableLabs/spectacle/issues/1171)) Fix for URL state being overwritten (see [#1171](https://github.com/FormidableLabs/spectacle/issues/1171)) ([#1188](https://github.com/FormidableLabs/spectacle/pull/1188))

## 9.3.0

### Minor Changes

- Fixed lineNumberStyle prop for CodePane. (fixes [#1150](https://github.com/FormidableLabs/spectacle/issues/1150)) ([#1154](https://github.com/FormidableLabs/spectacle/pull/1154))

## 9.2.1

- Fix `use-broadcast-channel` to be compatible with React 18 strict mode, via [#1131](https://github.com/FormidableLabs/spectacle/pull/1131).
- Upgrade `react-syntax-highlighter` so that Spectacle works with Vite out of the box, via [#1132](https://github.com/FormidableLabs/spectacle/pull/1132).

## 9.2.0

- Fix deck level templates not displayed in presenter, print and export modes
- Persist deck template between slides in default and presenter modes [#1106](https://github.com/FormidableLabs/spectacle/issues/1106)
- Upgrade dependencies to be React 18-friendly, removing Enzyme in favor of RTL via [#1119](https://github.com/FormidableLabs/spectacle/pull/1119)
- Fix only the first page showing in print and export modes in Firefox [#1077](https://github.com/FormidableLabs/spectacle/issues/1077)
- Add AnimatedProgress component [#1105](https://github.com/FormidableLabs/spectacle/issues/1105)
- Add SlideLayout helper for quick-creation of slides with basic layout needs via [#1123](https://github.com/FormidableLabs/spectacle/pull/1123).

## 9.1.1

- Newlines in markdown slides correctly render line breaks [#1114](https://github.com/FormidableLabs/spectacle/pull/1114)

## 9.1.0

- Added support for deck-wide background images [#1112](https://github.com/FormidableLabs/spectacle/pull/1112)

## 9.0.2

- Fixed disappearing slides with background images in export and overview mode [#1100](https://github.com/FormidableLabs/spectacle/issues/1100)

## 9.0.1

- Fix export mode. [#1097](https://github.com/FormidableLabs/spectacle/issues/1097)

## 9.0.0

- Migrated Spectacle core to TypeScript

## 9.0.0-beta.7

- Ensured types for styled-system based components are included with Spectacle core

## 9.0.0-beta.6

- Fixed path for emitting type declarations

## 9.0.0-beta.5

- Removed dependency on Node assert

## 9.0.0-beta.3

- Added TypeScript development example

## 9.0.0-beta.2

- webpack 5 upgrade (@carlos-kelly)

## 9.0.0-beta.1

- Finished initial pass of TypeScript conversion (@scottrippey)

## 8.5.0

- Add styled-system position and layout functions to CodePane, Progress, Markdown components [#1079](https://github.com/FormidableLabs/spectacle/pull/1079)

## 8.4.1

- Fix highlight ranges bug [#1070](https://github.com/FormidableLabs/spectacle/pull/1070)
- Update code samples with correct indentation
- Added Google Tag Manager to documentation

## 8.4.0

- Fix script reference in `examples/one-page.html`.
- Docs: Update Formidable logo.
- Add `Stepper` component and update docs for `useSteps` and `Appear`.

## 8.3.0

- Added ref-forwarding for `CodePane`, `FullScreen`, `Markdown`, and `Progress`.
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
- Fixed duplication final slide in Presenter Mode

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
