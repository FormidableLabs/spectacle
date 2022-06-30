export { default as Deck } from './components/deck';
export { default as Slide, SlideContext } from './components/slide/slide';
export { Appear, Stepper } from './components/appear';
export { default as CodePane } from './components/code-pane';
export type { CodePaneProps } from './components/code-pane';
export {
  OrderedList,
  Quote,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Link,
  CodeSpan
} from './components/typography';
export {
  Table,
  TableCell,
  TableRow,
  TableHeader,
  TableBody
} from './components/table';
export type { TableProps } from './components/table';
export { FlexBox, Grid, Box } from './components/layout-primitives';
export { Image, FullSizeImage } from './components/image';
export { default as Notes } from './components/notes';
export { default as Progress } from './components/progress';
export type { ProgressProps } from './components/progress';
export { default as AnimatedProgress } from './components/animated-progress';
export type { AnimatedProgressProps } from './components/animated-progress';
export { default as FullScreen } from './components/fullscreen';
export { default as SlideLayout } from './components/slide-layout';
export {
  Markdown,
  MarkdownSlideSet,
  MarkdownSlide,
  MarkdownPreHelper
} from './components/markdown/markdown';
export { default as SpectacleLogo } from './components/logo';
export { default as mdxComponentMap } from './utils/mdx-component-mapper';
export type { MarkdownComponentMap } from './utils/mdx-component-mapper';
export { removeNotes, isolateNotes } from './utils/notes';
export { default as indentNormalizer } from './utils/indent-normalizer';
export { DeckContext } from './components/deck/deck';
export type { DeckProps, SlideId } from './components/deck/deck';
export { default as useMousetrap } from './hooks/use-mousetrap';
export { default as defaultTheme } from './theme/default-theme';
export type {
  SpectacleTheme,
  SpectacleThemeOverrides
} from './theme/default-theme';
export {
  fadeTransition,
  slideTransition,
  defaultTransition
} from './components/transitions';
export type { SlideTransition } from './components/transitions';
