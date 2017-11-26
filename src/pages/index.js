// @flow

import React from 'react';
import styled from 'styled-components';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import GithubIcon from 'react-icons/lib/fa/github';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

declare var graphql: any;

type Props = {
  data: {
    site: {
      siteMetadata: {
        twitterUrl: string,
        githubUrl: string,
      },
    },
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
            image?: {
              childImageSharp: {
                sizes: {},
              },
            },
          },
        },
      }>,
    },
  },
};

const Root = styled.div`
  max-width: 1200px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
`;

const SocialIcon = styled.a`
  margin-left: 0.5rem;
  color: #999;

  :hover {
    color: #333;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PostContainer = styled.div`
  padding: 2rem;
  width: 33%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const PostInnerContainer = styled(Link)`
  color: inherit;
  text-decoration: none;

  :hover {
    text-decoration: none;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const StyledImg = styled(Img)`
  background-color: #f0f0f0;
  margin: 0 0 1.5rem;
  max-height: 250px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  line-height: 1.167em;
  margin: 0 0 1rem;
`;

const Subtitle = styled.h3`
  display: block;
  font-size: 0.75em;
  line-height: 1.334em;
  font-weight: 400;
  margin: 0;
`;

const Content = styled.p`
  margin: 0 0 1rem;
`;

const Index = ({
  data: {
    site: { siteMetadata: { twitterUrl, githubUrl } },
    allMarkdownRemark: { edges: posts },
  },
}: Props) => (
  <Root>
    <SocialIcons>
      <SocialIcon href={twitterUrl}>
        <TwitterIcon size={25} />
      </SocialIcon>

      <SocialIcon href={githubUrl}>
        <GithubIcon size={25} />
      </SocialIcon>
    </SocialIcons>

    <hr />

    <PostsContainer>
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => (
          <PostContainer key={post.id}>
            <PostInnerContainer to={post.fields.slug}>
              {post.frontmatter.image && (
                <StyledImg
                  sizes={post.frontmatter.image.childImageSharp.sizes}
                  backgroundColor="#f0f0f0"
                />
              )}

              <Title>{post.frontmatter.title}</Title>
              <Content>{post.excerpt}</Content>
              <Subtitle>{post.frontmatter.date}</Subtitle>
            </PostInnerContainer>
          </PostContainer>
        ))}
    </PostsContainer>
  </Root>
);

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        twitterUrl
        githubUrl
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
            image {
              childImageSharp {
                sizes(maxWidth: 740) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
