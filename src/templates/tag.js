// @flow

import React from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts';

declare var graphql: any;

type Props = {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string,
          excerpt: string,
          fields: {
            slug: string,
          },
          frontmatter: {
            title: string,
            date: string,
          },
        },
      }>,
    },
  },
  pathContext: {
    tag: string,
  },
};

const Root = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 1.45rem 1.0875rem 1.45rem;
`;

const Title = styled.h1`
  margin: 0 0 1rem;
`;

const Tag = ({
  data: { allMarkdownRemark: { edges: posts } },
  pathContext: { tag },
}: Props) => (
  <Root>
    <Title>Tagged with &quot;{tag}&quot;</Title>

    <hr />

    <Posts posts={posts.map(o => o.node)} />
  </Root>
);

export default Tag;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
          }
        }
      }
    }
  }
`;
