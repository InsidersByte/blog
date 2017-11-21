// @flow

import React from 'react';
import GatsbyLink from 'gatsby-link';

type Props = {
  pathContext: {
    posts: {},
    post: [
      {
        id: string,
        frontmatter: {
          path: string,
          title: string,
        },
        excerpt: string,
      },
    ],
    tag: string,
  },
};

const Tag = ({ pathContext: { post, tag } }: Props) => (
  <div>
    <h1>Tagged with {tag}</h1>

    {post.map(({ id, frontmatter, excerpt }, index) => (
      <div key={id}>
        <h1>
          <GatsbyLink to={frontmatter.path}>{frontmatter.title}</GatsbyLink>
        </h1>

        <p>{excerpt}</p>

        {index !== post.length - 1 && <hr />}
      </div>
    ))}
  </div>
);

export default Tag;
