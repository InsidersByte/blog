// @flow

import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism-okaidia.css';
import Header from '../components/Header';
import config from '../../gatsby-config';
import '../css/styles.css';

type Props = {
  location: {
    pathname: string,
  },
  children: Function,
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
  padding-top: 0;
`;

const Template = ({ location, children }: Props) => {
  // The root pathname when using github pages is /blog/
  const isRoot =
    location.pathname === config.pathPrefix ||
    location.pathname.replace(/\/$/, '') === config.pathPrefix;

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
