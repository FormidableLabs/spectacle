import React from 'react';
import PropTypes from 'prop-types';
import * as path from 'path';
import styled, { css } from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { useLocation, Link } from 'react-router-dom';
import { useMarkdownPage } from 'react-static-plugin-md-pages';
import Highlight, { Prism } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/github';
import SvgAnchor from '../assets/anchor';

const getLanguage = className => {
  const res = className.match(/language-(\w+)/);
  return res ? res[1] : null;
};

code => {
  return code.replace(
    /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g,
    ''
  );
};

const importRegex = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
const removeImportFromPreview = code => {
  return code.replace(importRegex, '');
};

const Pre = styled.pre`
  background: ${p => p.theme.colors.codeBg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.spacing.xs};

  font-size: ${p => p.theme.fontSizes.code};
  line-height: ${p => p.theme.lineHeights.code};

  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${p => p.theme.spacing.sm};
  position: relative;
  white-space: pre;
`;

const Code = styled.code`
  display: block;
  font-family: ${p => p.theme.fonts.code};
  color: ${p => p.theme.colors.code};
  font-variant-ligatures: none;
  font-feature-settings: normal;
  white-space: pre;
`;

const InlineCode = styled(props => {
  const children = props.children.replace(/\\\|/g, '|');
  return <code {...props}>{children}</code>;
})`
  background: ${p => p.theme.colors.codeBg};
  color: ${p => p.theme.colors.code};
  font-family: ${p => p.theme.fonts.code};
  font-size: ${p => p.theme.fontSizes.small};
  border-radius: ${p => p.theme.spacing.xs};

  display: inline-block;
  vertical-align: baseline;
  font-variant-ligatures: none;
  font-feature-settings: normal;
  padding: 0 0.2em;
  margin: 0;

  a > & {
    text-decoration: underline;
  }
`;

const InlineImage = styled.img`
  display: inline-block;
  margin: 0 ${p => p.theme.spacing.sm} ${p => p.theme.spacing.md} 0;
  padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.sm};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.spacing.xs};
`;

const ImageWrapper = styled.div`
  margin: ${p => p.theme.spacing.md} 0;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.spacing.xs};
  background: ${p => p.theme.colors.bg};

  display: flex;
  flex-direction: column;

  & > img {
    padding: ${p => p.theme.spacing.md};
    align-self: center;
    max-height: 60vh;
  }
`;

const ImageAlt = styled.span.attrs(() => ({
  'aria-hidden': true // This is just duplicating alt
}))`
  display: block;
  padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.sm};
  border-top: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.codeBg};
  font-size: ${p => p.theme.fontSizes.small};
`;

const Image = props => {
  const { height, width, alt, src } = props;
  if (height || width) return <InlineImage {...props} />;

  return (
    <ImageWrapper>
      <img alt={alt} src={src} />
      <ImageAlt>{alt}</ImageAlt>
    </ImageWrapper>
  );
};

Image.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

const HighlightCode = ({ className = '', children }) => {
  const language = getLanguage(className);
  return (
    <Highlight
      Prism={Prism}
      theme={github}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Code
          style={{
            ...style,
            fontFamily: 'Space Mono, monospace',
            backgroundColor: 'none'
          }}
          className={className}
        >
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Code>
      )}
    </Highlight>
  );
};

HighlightCode.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const Blockquote = styled.blockquote`
  margin: ${p => p.theme.spacing.md} 0;
  padding: 0 0 0 ${p => p.theme.spacing.md};
  border-left: 0.5rem solid ${p => p.theme.colors.border};
  font-size: ${p => p.theme.fontSizes.small};

  & > * {
    margin: ${p => p.theme.spacing.sm} 0;
  }
`;

const sharedTableCellStyling = css`
  padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.sm};
  border-left: 1px solid ${p => p.theme.colors.passiveBg};
  border-bottom: 1px solid ${p => p.theme.colors.passiveBg};
`;

const TableHeader = styled.th`
  text-align: left;
  white-space: nowrap;
  ${sharedTableCellStyling}
`;

const TableCell = styled.td`
  width: min-content;
  ${sharedTableCellStyling}

  ${p => {
    const isCodeOnly = React.Children.toArray(p.children).every(
      x => x.props && x.props.mdxType === 'inlineCode'
    );
    return (
      isCodeOnly &&
      css`
        background-color: ${p.theme.colors.codeBg};

        & > ${InlineCode} {
          background: none;
          padding: 0;
          margin: 0;
        }
      `
    );
  }}

  &:last-child {
    min-width: 20rem;
    width: max-content;
  }

  &:first-child {
    white-space: nowrap;
  }

  &:nth-child(2) {
    overflow-wrap: break-word;
    min-width: 20rem;
  }
`;

const TableOverflow = styled.div`
  overflow-x: scroll;
`;

const Table = styled.table`
  border: 1px solid ${p => p.theme.colors.passiveBg};
  border-collapse: collapse;
`;

const TableWithOverflow = props => (
  <TableOverflow>
    <Table {...props} />
  </TableOverflow>
);

const MdLink = ({ href, children }) => {
  const location = useLocation();
  const currentPage = useMarkdownPage();

  if (!currentPage) {
    return null;
  }

  if (href.startsWith('#')) {
    return <Link to={href}>{children}</Link>;
  }

  if (!/^\w+:/.test(href)) {
    const dir = path.dirname(currentPage.originalPath);
    const basePath = location.pathname
      .replace(currentPage.originalPath, '')
      .replace('//', '/');
    const head = dir === '.' ? basePath : `${basePath}${dir}`;
    const to = href.includes(head)
      ? `${href}/`
      : path.resolve(`/${head}/${href}/`);

    return <Link to={to}>{children}</Link>;
  }

  return (
    <a rel="noopener noreferrer" target="_blank" href={href}>
      {children}
    </a>
  );
};

MdLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const HeadingText = styled.h1`
  &:target::before {
    content: '';
    display: block;
    height: 1.5em;
    margin: -1.5em 0 0;
  }
`;

const AnchorLink = styled.a`
  display: inline-block;
  color: ${p => p.theme.colors.accentLight};
  padding-right: 0.5rem;
  width: 2rem;

  @media ${({ theme }) => theme.media.sm} {
    margin-left: -2rem;
    display: none;

    ${HeadingText}:hover > & {
      display: inline-block;
    }
  }
`;

const AnchorIcon = styled(SvgAnchor)`
  height: 100%;
`;

const Header = tag => ({ id, children }) => {
  return (
    <HeadingText as={tag} id={id}>
      <AnchorLink href={`#${id}`}>
        <AnchorIcon />
      </AnchorLink>
      {children}
    </HeadingText>
  );
};

const components = {
  pre: Pre,
  img: Image,
  blockquote: Blockquote,
  inlineCode: InlineCode,
  code: HighlightCode,
  table: TableWithOverflow,
  th: TableHeader,
  td: TableCell,
  a: MdLink,
  h1: HeadingText,
  h2: Header('h2'),
  h3: Header('h3')
};

export const MDXComponents = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

MDXComponents.propTypes = {
  children: PropTypes.node.isRequired
};
