// @flow

import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import BackIcon from 'react-icons/lib/fa/chevron-left';
import ForwardIcon from 'react-icons/lib/fa/chevron-right';
import Link from '../components/Link';
import Tags from '../components/Tags';

declare var graphql: any;

type Post = {
  html: string,
  frontmatter: {
    title: string,
    date: string,
    tags?: Array<string>,
    path: string,
  },
};

type Props = {
  data: {
    markdownRemark: Post,
  },
  pathContext: {
    next: Post,
    prev: Post,
  },
};

const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
`;

const Date = styled.h2`
  text-align: center;
  margin: 0;
  padding: 0;
  color: #555;
  margin-bottom: 1rem;
`;

const Navigation = styled.div`
  min-height: 60px;
`;

const PreviousLink = Link.extend`
  float: left;
`;

const NextLink = Link.extend`
  float: right;
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const Template = ({ data, pathContext }: Props) => {
  const { markdownRemark: post } = data;
  const { next, prev } = pathContext;

  return (
    <div>
      <Helmet title={`Gatsby Blog - ${post.frontmatter.title}`} />
      <div>
        <Title>{post.frontmatter.title}</Title>
        <Date>{post.frontmatter.date}</Date>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <Tags list={post.frontmatter.tags || []} />

        <Navigation>
          {prev && (
            <PreviousLink to={prev.frontmatter.path}>
              <BackIcon /> {prev.frontmatter.title}
            </PreviousLink>
          )}

          <Spacer />

          {next && (
            <NextLink to={next.frontmatter.path}>
              {next.frontmatter.title} <ForwardIcon />
            </NextLink>
          )}
        </Navigation>
      </div>
    </div>
  );
};

export default Template;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
      }
    }
  }
`;
