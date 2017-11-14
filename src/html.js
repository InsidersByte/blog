// @flow

import React, { type Node } from 'react';
import PropTypes from 'prop-types';

type Props = {
  body: string,
  headComponents: Node,
  postBodyComponents: Node,
};

const HTML = ({ body, headComponents, postBodyComponents }: Props) => {
  let css;

  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        dangerouslySetInnerHTML={{
          __html: require('!raw!../public/styles.css'),
        }}
      />
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
