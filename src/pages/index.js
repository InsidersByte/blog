// @flow

import React from 'react';
import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';

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
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.25rem;
  border-bottom: 2px solid #eee;

  :last-child {
    border-bottom-width: 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`;

const Content = styled.p`
  margin: 1rem 0;
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
              <GatsbyLink to={post.fields.slug}>
                {post.frontmatter.title}
              </GatsbyLink>
            </Title>

            <Subtitle>{post.frontmatter.date}</Subtitle>

            <Content>{post.excerpt}</Content>

            <GatsbyLink to={post.fields.slug}>Read more</GatsbyLink>
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
