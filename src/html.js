// @flow

import React, { type Node } from 'react';
import favicon from './images/favicon.ico';

type Props = {
  body: string,
  headComponents: Node,
  postBodyComponents: Node,
};

const HTML = ({ body, headComponents, postBodyComponents }: Props) => {
  let css;

  if (process.env.NODE_ENV === 'production') {
    /* eslint-disable global-require, import/no-webpack-loader-syntax, import/no-unresolved */
    css = (
      <style
        dangerouslySetInnerHTML={{
          // $FlowIgnore only exists in production
          __html: require('!raw!../public/styles.css'),
        }}
      />
    );
    /* eslint-enable */
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href={favicon} />
        {headComponents}
        {css}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;
