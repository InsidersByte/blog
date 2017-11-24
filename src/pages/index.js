// @flow

import React from 'react';
import styled from 'styled-components';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import GithubIcon from 'react-icons/lib/fa/github';
import GatsbyLink from 'gatsby-link';

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
          },
        },
      }>,
    },
  },
};

const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
`;

const SocialIcon = styled.a`
  margin-left: 0.5rem;
  color: #999999;

  :hover {
    color: #333333;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.25rem;
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

const Index = ({
  data: {
    site: { siteMetadata: { twitterUrl, githubUrl } },
    allMarkdownRemark: { edges: posts },
  },
}: Props) => (
  <div>
    <SocialIcons>
      <SocialIcon href={twitterUrl}>
        <TwitterIcon size={25} />
      </SocialIcon>

      <SocialIcon href={githubUrl}>
        <GithubIcon size={25} />
      </SocialIcon>
    </SocialIcons>

    <hr />

    <div>
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }, index) => (
          <div>
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
            {index < posts.length - 1 && <hr />}
          </div>
        ))}
    </div>
  </div>
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
