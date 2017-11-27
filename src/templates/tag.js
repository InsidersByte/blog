// @flow

import React from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts';

type Props = {
  pathContext: {
    posts: Array<{
      id: string,
      excerpt: string,
      fields: {
        slug: string,
      },
      frontmatter: {
        title: string,
        date: string,
      },
    }>,
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

const Tag = ({ pathContext: { posts, tag } }: Props) => (
  <Root>
    <Title>Tagged with {tag}</Title>

    <hr />

    <Posts posts={posts} />
  </Root>
);

export default Tag;
