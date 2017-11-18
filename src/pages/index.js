// @flow

import React from 'react';
import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';
import Link from '../components/Link';

declare var graphql: any;

type Props = {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string,
          excerpt: string,
          frontmatter: {
            title: string,
            date: string,
            path: string,
          },
        },
      }>,
    },
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 0.25rem;
  border-bottom: 2px solid #eee;

  :last-child {
    border-bottom-width: 0;
  }
`;

const Title = styled.h1`
  margin: 0 auto;
`;

const Date = styled.h2`
  margin: 0 auto;
`;

const CenteredLink = Link.extend`
  margin: 0 auto;
`;

const Index = ({ data }: Props) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => (
          <Container key={post.id}>
            <Title>
              <GatsbyLink to={post.frontmatter.path}>
                {post.frontmatter.title}
              </GatsbyLink>
            </Title>

            <Date>{post.frontmatter.date}</Date>

            <p>{post.excerpt}</p>

            <CenteredLink to={post.frontmatter.path}>Read more</CenteredLink>
          </Container>
        ))}
    </div>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
