import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMarkdownPage } from 'react-static-plugin-md-pages';
import { ScrollToTop } from '../../components/scroll-to-top';

import { MDXComponents } from '../../components/mdx';

const Container = styled.main.attrs(() => ({
  className: 'page-content'
}))`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
`;

const Content = styled.article.attrs(() => ({
  id: 'page-content'
}))`
  flex: 1;
  min-height: calc(100vh - ${p => p.theme.layout.header});
  background: ${p => p.theme.colors.bg};
  padding: ${p => p.theme.spacing.md};

  @media ${p => p.theme.media.lg} {
    padding: ${p => p.theme.spacing.lg};
  }
`;

const Legend = styled.aside`
  display: none;

  @media ${({ theme }) => theme.media.lg} {
    display: block;
    position: sticky;
    background: ${p => p.theme.colors.textLight};
    top: ${p => p.theme.layout.header};
    width: 100%;
    max-width: ${p => p.theme.layout.legend};
    padding: ${p => p.theme.spacing.lg} ${p => p.theme.spacing.md};
    margin: 0;
  }
`;

const LegendTitle = styled.h3`
  font-size: ${p => p.theme.fontSizes.body};
  font-weight: ${p => p.theme.fontWeights.heading};
  margin-bottom: ${p => p.theme.spacing.sm};
`;

const HeadingList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const HeadingItem = styled.li`
  line-height: ${p => p.theme.lineHeights.heading};
  margin-bottom: ${p => p.theme.spacing.xs};

  > a {
    font-size: ${p => p.theme.fontSizes.small};
    font-weight: ${p => p.theme.fontWeights.body};
    color: ${p => p.theme.colors.passive};
    text-decoration: none;
    transition: color 0.2s ease-out;

    &:hover {
      color: ${p => p.theme.colors.accentLight};
    }
  }
`;

const SectionList = () => {
  const page = useMarkdownPage();
  if (!page || !page.headings) return null;

  const headings = page.headings.filter(x => x.depth > 1);
  if (headings.length === 0) return null;

  return (
    <>
      <LegendTitle>In this section</LegendTitle>
      <HeadingList>
        {headings.map(heading => (
          <HeadingItem key={heading.slug}>
            <a href={`#${heading.slug}`}>{heading.value}</a>
          </HeadingItem>
        ))}
      </HeadingList>
    </>
  );
};

export const ArticleStyling = ({ children, SectionList }) => (
  <Container>
    <Legend>{SectionList ? <SectionList /> : null}</Legend>
    <Content>{children}</Content>
  </Container>
);

ArticleStyling.propTypes = {
  children: PropTypes.node.isRequired,
  SectionList: PropTypes.func
};

const Article = ({ children }) => (
  <>
    <ScrollToTop />
    <ArticleStyling SectionList={SectionList}>
      <MDXComponents>{children}</MDXComponents>
    </ArticleStyling>
  </>
);

Article.propTypes = {
  children: PropTypes.node.isRequired
};

export default Article;
