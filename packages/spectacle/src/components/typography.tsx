import styled, { CSSObject } from 'styled-components';
import {
  color,
  typography,
  space,
  compose,
  system,
  ColorProps,
  TypographyProps,
  SpaceProps,
  BorderProps
} from 'styled-system';
import { FC, PropsWithChildren, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

const decoration = system({ textDecoration: true });
type DecorationProps = Pick<CSSObject, 'textDecoration'>;

export type CommonTypographyProps = ColorProps & TypographyProps & SpaceProps;

const Text = styled.div<CommonTypographyProps>(
  compose(color, typography, space)
);
Text.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  padding: 0,
  margin: 0
};

const CodeSpan = styled.code<CommonTypographyProps>(
  compose(color, typography, space)
);
CodeSpan.defaultProps = {
  fontFamily: 'monospace',
  fontSize: 'text'
};

const Link = styled.a<CommonTypographyProps & DecorationProps>(
  compose(color, typography, space, decoration)
);
Link.defaultProps = {
  fontFamily: 'text',
  fontSize: 'text',
  textDecoration: 'underline',
  color: 'quaternary'
};

const Heading = styled(Text)({});
Heading.defaultProps = {
  color: 'secondary',
  fontFamily: 'header',
  fontSize: 'h1',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 1
};

const Quote = styled(
  Text as FC<
    PropsWithChildren<CommonTypographyProps & Pick<BorderProps, 'borderColor'>>
  >
)`
  border-left: 1px solid
    ${({ theme, borderColor }) => borderColor || theme.colors.secondary};

  div {
    margin: 0;
  }
`;
Quote.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  fontStyle: 'italic',
  padding: '16px 0 16px 8px',
  margin: 0
};

const listStyle = system({
  listStyleType: true
});
type ListStyleProps = Pick<CSSObject, 'listStyleType'>;

const OrderedList = styled.ol<CommonTypographyProps & ListStyleProps>(
  compose(color, typography, space, listStyle)
);
OrderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};

const UnorderedList = styled.ul<CommonTypographyProps & ListStyleProps>(
  compose(color, typography, space, listStyle)
);
UnorderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};

const ListItem = styled.li<CommonTypographyProps>(
  compose(color, typography, space)
);
ListItem.defaultProps = {
  margin: 0
};

const FitContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScalableText = styled(Text)<{ scale: number }>`
  transform-origin: center;
  transform: scale(${(props) => props.scale});
  white-space: nowrap;
` as any; // TODO: FIX TS ERROR (remove `any`).
ScalableText.defaultProps = {
  ...Text.defaultProps,
  scale: 1
};

const FitText: FC<CommonTypographyProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useResizeObserver({
    ref: containerRef,
    onResize: () => {
      if (!containerRef.current || !textRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      if (textWidth === 0) return;

      const newScale = Math.min(containerWidth / textWidth);
      setScale(newScale);
    }
  });

  return (
    <FitContainer ref={containerRef}>
      <ScalableText {...props} ref={textRef} scale={scale} />
    </FitContainer>
  );
};

export {
  Text,
  Heading,
  Quote,
  OrderedList,
  UnorderedList,
  ListItem,
  Link,
  CodeSpan,
  FitText
};
