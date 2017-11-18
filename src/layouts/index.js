// @flow

import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism-okaidia.css';
import '../css/typography.css';

type Props = {
  location: {
    pathname: string,
  },
  children: Function,
};

const Template = ({ location, children }: Props) => {
  const isRoot = location.pathname === '/';

  return (
    <div>
      <Helmet
        title="Gatsby Default (Blog) Starter"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <div
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.45rem`,
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: isRoot ? `1.45rem 1.0875rem` : `1rem 0.75rem`,
          }}
        >
          <h1 style={{ margin: 0, fontSize: isRoot ? `2.5rem` : `2rem` }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Insiders Byte
            </Link>
          </h1>
        </div>
      </div>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        {children()}
      </div>
    </div>
  );
};

export default Template;
