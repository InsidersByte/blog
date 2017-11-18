// @flow

import React from 'react';
import Link from 'gatsby-link';

type Props = {
  list?: Array<string>,
};

const Tags = ({ list = [] }: Props) => (
  <ul>
    {list.map(tag => (
      <li key={tag}>
        <Link to={`/tags/${tag}`}>{tag}</Link>
      </li>
    ))}
  </ul>
);

Tags.defaultProps = {
  list: [],
};

export default Tags;
