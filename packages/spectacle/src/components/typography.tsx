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
import {
  FC,
  PropsWithChildren,
  RefAttributes,
  useRef,
  useState,
  HTMLAttributes
} from 'react';
import useResizeObserver from 'use-resize-observer';

const decoration = system({ textDecoration: true });
type DecorationProps = Pick<CSSObject, 'textDecoration'>;

export type CommonTypographyProps = ColorProps & TypographyProps & SpaceProps;

const Text = styled.div.attrs<CommonTypographyProps>((props) => ({
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  padding: 0,
  margin: 0,
  ...props
}))<CommonTypographyProps>(compose(color, typography, space));

const CodeSpan = styled.code.attrs<CommonTypographyProps>((props) => ({
  fontFamily: 'monospace',
  fontSize: 'text',
  ...props
}))<CommonTypographyProps>(compose(color, typography, space));

const Link = styled.a.attrs<CommonTypographyProps & DecorationProps>(
  (props) => ({
    fontFamily: 'text',
    fontSize: 'text',
    textDecoration: 'underline',
    color: 'quaternary',
    ...props
  })
)<CommonTypographyProps & DecorationProps>(
  compose(color, typography, space, decoration)
);

const Heading = styled(Text).attrs<CommonTypographyProps>((props) => ({
  color: 'secondary',
  fontFamily: 'header',
  fontSize: 'h1',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 1,
  ...props
}))<CommonTypographyProps>({});

const Quote = styled(
  Text as FC<
    PropsWithChildren<CommonTypographyProps & Pick<BorderProps, 'borderColor'>>
  >
).attrs<CommonTypographyProps & Pick<BorderProps, 'borderColor'>>((props) => ({
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  fontStyle: 'italic',
  padding: '16px 0 16px 8px',
  margin: 0,
  ...props
}))<CommonTypographyProps & Pick<BorderProps, 'borderColor'>>`
  border-left: 1px solid
    ${({ theme, borderColor }) => borderColor || theme.colors.secondary};

  div {
    margin: 0;
  }
`;

const listStyle = system({
  listStyleType: true
});
type ListStyleProps = Pick<CSSObject, 'listStyleType'>;

const OrderedList = styled.ol.attrs<CommonTypographyProps & ListStyleProps>(
  (props) => ({
    color: 'primary',
    fontFamily: 'text',
    fontSize: 'text',
    textAlign: 'left',
    margin: 0,
    ...props
  })
)<CommonTypographyProps & ListStyleProps>(
  compose(color, typography, space, listStyle)
);

const UnorderedList = styled.ul.attrs<CommonTypographyProps & ListStyleProps>(
  (props) => ({
    color: 'primary',
    fontFamily: 'text',
    fontSize: 'text',
    textAlign: 'left',
    margin: 0,
    ...props
  })
)<CommonTypographyProps & ListStyleProps>(
  compose(color, typography, space, listStyle)
);

const ListItem = styled.li.attrs<CommonTypographyProps>((props) => ({
  margin: 0,
  ...props
}))<CommonTypographyProps>(compose(color, typography, space));

const FitContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScalableText = styled(
  Text as FC<CommonTypographyProps & RefAttributes<HTMLDivElement>>
).attrs<CommonTypographyProps & { scale?: number }>((props) => ({
  textAlign: 'center',
  ...props
}))<{ scale?: number }>`
  transform-origin: center;
  transform: scale(${(props) => props.scale || 1});
  white-space: nowrap;
`;

const FitText: FC<
  PropsWithChildren<CommonTypographyProps & HTMLAttributes<HTMLDivElement>>
> = (props) => {
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
