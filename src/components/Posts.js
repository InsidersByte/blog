// @flow

import React from 'react';
import styled from 'styled-components';
import Post from './Post';

type Props = {
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
};

const Hr = styled.hr`
  margin: 0;
`;

const Posts = ({ posts }: Props) =>
  posts.filter(post => post.frontmatter.title.length > 0).map((post, index) => (
    <div key={post.id}>
      <Post post={post} />

      {index < posts.length - 1 && <Hr />}
    </div>
  ));

export default Posts;
