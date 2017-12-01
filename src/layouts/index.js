// @flow

import React from 'react';
import raven from 'raven-js';
import Helmet from 'react-helmet';
import Aux from 'react-aux';
import 'prismjs/themes/prism-okaidia.css';
import Header from '../components/Header';
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
  children: Function,
};

const Template = ({
  data: { site: { siteMetadata: { title, description } } },
  children,
}: Props) => (
  <Aux>
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
    <Header title={title} />
    {children()}
  </Aux>
);

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
