// @flow

import React from 'react';
import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';
import paramCase from 'param-case';

type Props = {
  tags: Array<string>,
};

const List = styled.ul`
  padding: 0 0 0.5rem;
  list-style: none;
  list-style-image: none;
  margin: 0;
`;

const ListItem = styled.li`
  display: inline-block;
  border: none;
  color: rgba(0, 0, 0, 0.68);
  background: rgba(0, 0, 0, 0.05);
  padding: 5px 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  line-height: 22px;
  position: relative;

  :hover {
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.68);
  }
`;

const StyledLink = styled(GatsbyLink)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  :hover {
    text-decoration: none;
  }
`;

const Tags = ({ tags = [] }: Props) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <List>
      {tags.map(tag => (
        <ListItem key={tag}>
          <StyledLink to={`/tags/${paramCase(tag)}/`}>{tag}</StyledLink>
        </ListItem>
      ))}
    </List>
  );
};

export default Tags;
