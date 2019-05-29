// Definitions by: Zachary Maybury <https://github.com/zmaybury>
//                 Kylie Stewart <https://github.com/kale-stew>

declare module 'spectacle' {
  import * as CSS from 'csstype';
  import * as React from 'react';

  /**
   * Alignment Types for Spectacle
   */
  type alignType =
    | 'flex-start flex-start'
    | 'flex-start center'
    | 'flex-start flex-end'
    | 'center flex-start'
    | 'center center'
    | 'center flex-end'
    | 'flex-end flex-start'
    | 'flex-end center'
    | 'flex-end flex-end';

  /**
   * Animation Types for Spectacle
   */
  type easeType =
    | 'back'
    | 'backIn'
    | 'backOut'
    | 'backInOut'
    | 'bounce'
    | 'bounceIn'
    | 'bounceOut'
    | 'bounceInOut'
    | 'circle'
    | 'circleIn'
    | 'circleOut'
    | 'circleInOut'
    | 'linear'
    | 'linearIn'
    | 'linearOut'
    | 'linearInOut'
    | 'cubic'
    | 'cubicIn'
    | 'cubicOut'
    | 'cubicInOut'
    | 'elastic'
    | 'elasticIn'
    | 'elasticOut'
    | 'elasticInOut'
    | 'exp'
    | 'expIn'
    | 'expOut'
    | 'expInOut'
    | 'poly'
    | 'polyIn'
    | 'polyOut'
    | 'polyInOut'
    | 'quad'
    | 'quadIn'
    | 'quadOut'
    | 'quadInOut'
    | 'sin'
    | 'sinIn'
    | 'sinOut'
    | 'sinInOut';

  /**
   * Progress Types for Spectacle
   */
  type progressType = 'pacman' | 'bar' | 'number' | 'none';

  /**
   * S Types for StyledS in Spectacle
   */
  type sType = 'italic' | 'bold' | 'line-through' | 'underline';

  /**
   * Target Types for links
   */
  type targetType = '_blank' | '_self' | '_parent' | '_top';

  /**
   * Theme Types for CodePane in Spectacle
   */
  type themeType = 'dark' | 'light' | 'external';

  /**
   * Transition Types for Spectacle
   */
  type transitionType = 'slide' | 'zoom' | 'fade' | 'spin';

  /**
   * All available DOM style properties and their types
   * https://www.npmjs.com/package/csstype
   */
  interface CSSProperties extends CSS.Properties<string | number> {}

  interface AnimProps {
    easing: easeType;
    fromStyle: CSSProperties | CSSProperties[];
    onAnim?: (forwards?: boolean, animIndex?: number) => void;
    order?: number;
    route?: object;
    style?: CSSProperties;
    toStyle: CSSProperties | CSSProperties[];
    transitionDuration: number;
  }

  interface AppearProps {
    easing?: easeType;
    endValue?: object;
    fid?: string;
    order?: number;
    startValue?: object;
    style?: BaseProps['style'];
    transitionDuration?: number;
  }

  /**
   * Base props for many Spectacle components
   */
  interface BaseProps {
    bgColor?: string;
    bgDarken?: number;
    bgImage?: string;
    bold?: boolean;
    caps?: boolean;
    className?: string;
    italic?: boolean;
    margin?: number | string;
    padding?: number | string;
    style?: CSSProperties;
    textAlign?: string;
    textColor?: string;
    textFont?: string;
    textSize?: string;
  }

  interface CodePaneProps {
    className?: BaseProps['className'];
    contentEditable?: boolean;
    lang?: string;
    source?: string;
    style?: BaseProps['style'];
    theme?: themeType;
  }

  interface ComponentPlaygroundProps {
    code?: string;
    previewBackgroundColor?: string;
    scope?: object;
    theme?: themeType;
    transformCode?: (code: string) => string;
  }

  interface DeckProps {
    autoplay?: boolean;
    autoplayDuration?: number;
    autoplayLoop?: boolean;
    autoplayOnStart?: boolean;
    controls?: boolean;
    globalStyles?: boolean;
    history?: any; // Needs a type, see https://github.com/ReactTraining/history
    showFullscreenControl?: boolean;
    onStateChange?: (previousState?: string, nextState?: string) => void;
    progress?: progressType;
    theme?: Theme;
    transition?: transitionType[];
    transitionDuration?: number;
  }

  interface FillProps {
    className?: string;
    style?: CSSProperties;
  }

  interface FitProps extends FillProps {} // tslint:disable-line:no-empty-interface

  interface GoToActionProps {
    margin?: BaseProps['margin'];
    padding?: BaseProps['padding'];
    render?: (goToSlide?: (slide: number | string) => void) => void;
    slide?: number | string;
    style?: BaseProps['style'];
  }

  interface HeadingProps extends BaseProps {
    fit?: boolean;
    lineHeight?: number;
    size?: number;
  }

  interface ImageProps {
    alt?: string;
    className?: BaseProps['className'];
    display?: string;
    height?: number | string;
    margin?: BaseProps['margin'];
    padding?: BaseProps['padding'];
    src?: string;
    width?: number | string;
  }

  interface LayoutProps {
    style?: CSSProperties;
  }

  interface LinkProps extends BaseProps {
    href?: string;
    target?: targetType;
  }

  interface MarkdownProps {
    mdastConfig?: { [key: string]: number | string };
    source?: string;
  }

  interface SlideProps extends BaseProps {
    align?: alignType;
    contentStyles?: CSSProperties;
    controlColor?: string;
    dispatch?: () => void;
    hash?: number | string;
    progressColor?: string;
    history?: any; // Needs a type, see https://github.com/ReactTraining/history
    id?: string;
    lastSlideIndex?: number;
    notes?: string;
    onActive?: (slideIndex: string | number) => void;
    slideIndex?: number;
    state?: string;
    transition?: transitionType[];
    transitionDuration?: number;
    transitionIn?: transitionType[];
    transitionOut?: transitionType[];
  }

  interface SProps extends BaseProps {
    type?: sType | sType[];
  }

  interface TextProps extends BaseProps {
    fit?: boolean;
    lineHeight?: number;
  }

  interface Theme {
    [key: string]: number | string;
  }

  class Anim extends React.Component<AnimProps> {}

  class Appear extends React.Component<AppearProps> {}

  class BlockQuote extends React.Component<BaseProps> {}

  class Cite extends React.Component<BaseProps> {}

  class Code extends React.Component<BaseProps> {}

  class CodePane extends React.Component<CodePaneProps> {}

  class ComponentPlayground extends React.Component<ComponentPlaygroundProps> {}

  class Deck extends React.Component<DeckProps> {}

  class Fill extends React.Component<FillProps> {}

  class Fit extends React.Component<FitProps> {}

  class GoToAction extends React.Component<GoToActionProps> {}

  class Heading extends React.Component<HeadingProps> {}

  class Image extends React.Component<ImageProps> {}

  class Layout extends React.Component<LayoutProps> {}

  class Link extends React.Component<LinkProps> {}

  class List extends React.Component<BaseProps> {}

  class ListItem extends React.Component<BaseProps> {}

  class Markdown extends React.Component<MarkdownProps> {}

  class Notes extends React.Component<BaseProps> {}

  class Quote extends React.Component<BaseProps> {}

  class S extends React.Component<SProps> {}

  class Slide extends React.Component<SlideProps> {}

  class SlideSet extends React.Component<BaseProps> {}

  class Table extends React.Component<BaseProps> {}

  class TableBody extends React.Component<BaseProps> {}

  class TableHeader extends React.Component<BaseProps> {}

  class TableHeaderItem extends React.Component<BaseProps> {}

  class TableItem extends React.Component<BaseProps> {}

  class TableRow extends React.Component<BaseProps> {}

  class Text extends React.Component<TextProps> {}

  class UnfitText extends React.Component<TextProps> {}
}

declare module 'spectacle/lib/utils/preloader' {
  const preloader: (obj: object) => void;
  export default preloader;
}

declare module 'spectacle/lib/themes/default' {
  import { Theme } from 'spectacle';
  const createTheme: (...args: object[]) => Theme;
  export default createTheme;
}
