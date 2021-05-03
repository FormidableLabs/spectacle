import Deck from './components/deck';
import Slide, { SlideContext } from './components/slide/slide';
import Appear from './components/appear';
import CodePane from './components/code-pane';
import {
  OrderedList,
  Quote,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Link,
  CodeSpan
} from './components/typography';
import {
  Table,
  TableCell,
  TableRow,
  TableHeader,
  TableBody
} from './components/table';
import { FlexBox, Grid, Box } from './components/layout';
import { Image, FullSizeImage } from './components/image';
import Notes from './components/notes';
import Progress from './components/progress';
import FullScreen from './components/fullscreen';
import {
  Markdown,
  MarkdownSlideSet,
  MarkdownSlide,
  MarkdownPreHelper
} from './components/markdown/markdown';
import SpectacleLogo from './components/logo';
import mdxComponentMap from './utils/mdx-component-mapper';
import { removeNotes, isolateNotes } from './utils/notes';
import indentNormalizer from './utils/indent-normalizer';
import { DeckContext } from './components/deck/deck';
import useMousetrap from './hooks/use-mousetrap';
import defaultTheme from './theme/default-theme';

import useActionDispatcher from './hooks/use-action-dispatcher';
import useAspectRatioFitting from './hooks/use-aspect-ratio-fitting';
import useAutofillHeight from './hooks/use-autofill-height';
import useBroadcastChannel from './hooks/use-broadcast-channel';
import useDeckReducer from './hooks/use-deck-state';
import { useToggleFullScreen } from './hooks/use-full-screen';
import useKeyboardControls from './hooks/use-keyboard-controls';
import useLocationSync from './hooks/use-location-sync';
import usePresentation from './hooks/use-presentation';
import useTouchControls from './hooks/use-touch-controls';
import { useSlide, useCollectSlides } from './hooks/use-slides';
import { useSteps, useCollectSteps } from './hooks/use-steps';

export {
  Appear,
  Deck,
  Slide,
  CodePane,
  Box,
  FlexBox,
  Grid,
  Image,
  FullSizeImage,
  OrderedList,
  Quote,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Link,
  CodeSpan,
  Notes,
  Progress,
  FullScreen,
  Markdown,
  MarkdownSlideSet,
  MarkdownSlide,
  MarkdownPreHelper,
  SpectacleLogo,
  Table,
  TableCell,
  TableRow,
  TableHeader,
  TableBody,
  mdxComponentMap,
  DeckContext,
  SlideContext,
  removeNotes,
  isolateNotes,
  indentNormalizer,
  defaultTheme,
  useMousetrap,
  useActionDispatcher,
  useAspectRatioFitting,
  useAutofillHeight,
  useBroadcastChannel,
  useDeckReducer,
  useToggleFullScreen,
  useKeyboardControls,
  useLocationSync,
  usePresentation,
  useSlide,
  useCollectSlides,
  useSteps,
  useCollectSteps,
  useTouchControls
};
