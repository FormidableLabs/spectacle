# Changelog

## Unreleased

- Allow for `props.fontSize` to override the theme's monospace font size in `CodePane`. [#875](https://github.com/FormidableLabs/spectacle/pull/875)
- Surface `textDecoration` prop from styled-system for `Link`s. [#869](https://github.com/FormidableLabs/spectacle/pull/869)

## 6.0.1

- Fix broken doc links.
  [#859](https://github.com/FormidableLabs/spectacle/pull/859), [#862](https://github.com/FormidableLabs/spectacle/pull/862)
- Add a live preview to the docs lander.
  [#860](https://github.com/FormidableLabs/spectacle/pull/860)
- Fix CodePane so user-supplied themes are surfaced.
  [#866](https://github.com/FormidableLabs/spectacle/pull/866)
- Fix nested Appears.
  [#864](https://github.com/FormidableLabs/spectacle/pull/864)

## 6.0.0

- Expand custom background support by adding `Background` props to the `Slide` component, along with `backgroundOpacity`.
  [#849](https://github.com/FormidableLabs/spectacle/pull/849)
- Add `Stepper`, allowing for code range highlighting/scrolling within CodePane.
  [#843](https://github.com/FormidableLabs/spectacle/pull/843)

## 6.0.0-alpha.8

- Update `examples/one-page.html` to `examples/js/index.js` with new script helper.
- Add support for Deck or Slide-level transitions.
- Add default transitions for Fade, Slide, and None.
- Fixes Full Screen component for Chrome/FF, adds support for Safari.
- Added support for dual-browser tab mode for presenter mode in all browsers.

## 6.0.0-alpha.7

- Fix `one-page.html` closing tags.

## 6.0.0-alpha.6

- Fix `one-page.html` unpkg script links.

## 6.0.0-alpha.5

- Add color props support to Flex Box.
  [#816](https://github.com/FormidableLabs/spectacle/issues/816)

## 6.0.0-alpha.4

- Move around internal examples, and publish some for `spectacle-cli` usage.
- Use top-center layout defaults for Spectacle. Drop `autoLayout` prop.
- Add `border` styled-system props to `FlexBox` and `Box`.

## 6.0.0-alpha.3

- Fixes overflow issue for presenter mode in Chrome.

## 6.0.0-alpha.1

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
