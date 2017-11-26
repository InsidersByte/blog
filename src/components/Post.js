// @flow

import React from 'react';
import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';

type Props = {
  post: {
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
};

const Root = styled.div`
  padding: 2.5rem 0;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  padding: 0;
`;

const Extract = styled.p`
  margin: 1.5rem 0;
  font-size: 1.2rem;
`;

const Time = styled.h3`
  color: #b3b3b1;
  font-size: 0.9rem;
  margin: 0;
`;

const Post = ({ post }: Props) => (
  <Root>
    <Title>
      <GatsbyLink to={post.fields.slug}>{post.frontmatter.title}</GatsbyLink>
    </Title>

    <Extract>{post.excerpt}</Extract>

    <Time>{post.frontmatter.date}</Time>
  </Root>
);

export default Post;
