// @flow

import React from 'react';
import styled from 'styled-components';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import GithubIcon from 'react-icons/lib/fa/github';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Posts from '../components/Posts';

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

const Root = styled.div`
  max-width: 700px;
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

    <Posts posts={posts.map(o => o.node)} />
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
          }
        }
      }
    }
  }
`;
