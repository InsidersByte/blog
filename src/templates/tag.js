// @flow

import React from 'react';
import GatsbyLink from 'gatsby-link';

type Props = {
  pathContext: {
    posts: [
      {
        id: string,
        excerpt: string,
        fields: {
          slug: string,
        },
        frontmatter: {
          title: string,
        },
      },
    ],
    tag: string,
  },
};

const Tag = ({ pathContext: { posts, tag } }: Props) => (
  <div>
    <h1>Tagged with {tag}</h1>

    {posts.map(
      ({ id, excerpt, fields: { slug }, frontmatter: { title } }, index) => (
        <div key={id}>
          <h1>
            <GatsbyLink to={slug}>{title}</GatsbyLink>
          </h1>

          <p>{excerpt}</p>

          {index < posts.length - 1 && <hr />}
        </div>
      )
    )}
  </div>
);

export default Tag;
