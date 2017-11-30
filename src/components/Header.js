// @flow

import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

type Props = {
  title: string,
};

const Root = styled.div`
  background: #663698;
`;

const Container = styled.div`
  padding: 1rem 0.75rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const StyledLink = styled(Link)`
  color: white;
`;

const Header = ({ title }: Props) => (
  <Root>
    <Container>
      <Title>
        <StyledLink to="/">{title}</StyledLink>
      </Title>
    </Container>
  </Root>
);

export default Header;
