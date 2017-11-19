// @flow

import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism-okaidia.css';
import Header from '../components/Header';
import '../css/typography.css';

type Props = {
  location: {
    pathname: string,
  },
  children: Function,
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

const Template = ({ location, children }: Props) => {
  const isRoot = location.pathname === '/';

  return (
    <div>
      <Helmet
        title="Insiders Byte - Blog"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Header isRoot={isRoot} />
      <Container>{children()}</Container>
    </div>
  );
};

export default Template;
