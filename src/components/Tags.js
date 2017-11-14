// @flow

import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

type Props = {
  list?: Array<string>,
};

const List = styled.ul``;

const ListItem = styled.li``;

const Tags = ({ list = [] }: Props) => (
  <List>
    {list.map(tag => (
      <ListItem key={tag}>
        <Link to={`/tags/${tag}`}>{tag}</Link>
      </ListItem>
    ))}
  </List>
);

Tags.defaultProps = {
  list: [],
};

export default Tags;
