// @flow

import React from 'react';
import raven from 'raven-js';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism-okaidia.css';
import Header from '../components/Header';
import config from '../../gatsby-config';
import appPackage from '../../package.json';
import '../css/styles.css';

if (process.env.GATSBY_RAVEN_DSN) {
  raven
    .config(process.env.GATSBY_RAVEN_DSN, {
      environment: process.env.NODE_ENV || 'development',
      release: appPackage.version,
      autoBreadcrumbs: true,
    })
    .install();
}

declare var graphql: any;

type Props = {
  data: {
    site: {
      siteMetadata: {
        title: string,
        description: string,
      },
    },
  },
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

const Template = ({
  data: { site: { siteMetadata: { title, description } } },
  location,
  children,
}: Props) => {
  // The root pathname when using github pages is /blog/
  const isRoot =
    location.pathname === config.pathPrefix ||
    location.pathname.replace(/\/$/, '') === config.pathPrefix;

  return (
    <div>
      <Helmet
        title={`${title} - Blog`}
        meta={[
          {
            name: 'description',
            content: description,
          },
          {
            name: 'keywords',
            content: 'developer, javascript, programming, react, node, reason',
          },
        ]}
      />
      <Header isRoot={isRoot} />
      <Container>{children()}</Container>
    </div>
  );
};

export default Template;

export const pageQuery = graphql`
  query TitleQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
