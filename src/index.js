import Deck from './components/deck';
import Slide from './components/slide';
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
import Markdown from './components/markdown';
import SpectacleLogo from './components/logo';
import mdxComponentMap from './utils/mdx-component-mapper';
import { removeNotes, isolateNotes } from './utils/notes';

export {
  Deck,
  Slide,
  Appear,
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
  SpectacleLogo,
  Table,
  TableCell,
  TableRow,
  TableHeader,
  TableBody,
  mdxComponentMap,
  removeNotes,
  isolateNotes
};
