// @flow

import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

type Props = {
  isRoot: boolean,
  title: string,
};

const Root = styled.div`
  background: #663698;
  margin-bottom: 1.45rem;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: ${props => (props.isRoot ? '1.45rem 1.0875rem' : '1rem 0.75rem')};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${props => (props.isRoot ? '2.5rem' : '2rem')};
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Header = ({ isRoot, title }: Props) => (
  <Root>
    <Container isRoot={isRoot}>
      <Title isRoot={isRoot}>
        <StyledLink to="/">{title}</StyledLink>
      </Title>
    </Container>
  </Root>
);

export default Header;
