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
import { fadeTransition, slideTransition } from './components/transitions';

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
  fadeTransition,
  slideTransition
};
