---
slug: "/shipping-proptypes-from-flow-definitions-in-npm-packages"
date: "2016-12-15T13:31:15.000Z"
title: "Shipping PropTypes from Flow definitions in NPM Packages"
image: "./images/flow-hero-logo.png"
featured: false
draft: false
tags: ["npm","react","flow"]
---

I have been using [flow] to add type safety to my JavaScript for a few months
now. I have been using it mainly with my [React] projects.

Flow is a static typechecker for JavaScript written by facebook. It follows the
Unix philosophy of do one thing and do it well.

The precursor to `flow` is [PropTypes], which is built directly into `react`.

## So if I use `PropTypes` why do I want to use `flow`?

The three key differences between PropTypes and flow are:

1. `flow` can be used in all JavaScript files and not just in `React` components
1. typing is checked at runtime with `PropTypes` and at compile time with `flow`
1. `PropTypes` are quite limited in comparison to `flow`

> For example, it’s possible to specify that a prop is some kind of function
> with `PropTypes`, but not what parameters that function accepts or what kind
> of value it might return.

## How do I get started with `flow`?

This is out of the scope of this post, I might write something later, but in the
meantime, the [docs][flow] are a pretty good place to start.

## Migrating from `PropTypes` to `flow`

So you have decided to start introducing `flow` into your codebase and migrate
from using `PropTypes` to `flow` definitions.

Where `flow` is opt-in, it means that you can migrate your components one at a
time. This approach does mean that you might only have partial coverage as you
migrate over, which means that you might miss things that would otherwise error.

These errors would also not be caught at runtime by `PropTypes` as they will
have been removed as part of the migration.

One solution is to write both `PropTypes` and `flow` definitions, but let's be
honest that sucks!

## Automatically adding `PropTypes` from `flow` definitions

Chances are that if you are using `flow` you will also be using [babel].

Thankfully there is a `babel` plugin, [babel-plugin-flow-react-proptypes], that
will automatically add `PropTypes` from your `flow` definitions, so you don't
have to.

It works the same as any other `babel` plugin, so you start by installing it as
a dependency.

```bash
yarn add --dev babel-plugin-flow-react-proptypes
```

Then by adding it to your `babelrc`.

```json
{
  "presets": ["..."],
  "plugins": ["flow-react-proptypes"]
}
```

With this plugin enabled you have maximised your type checking coverage to
include both compile time (`flow`) and runtime (`PropTypes`), this also has the
added affect of fixing the issue with migration that was mentioned above.

## Automatically adding `PropTypes` from `flow` definitions in `npm` packages

I have extended my use of the `babel-plugin-flow-react-proptypes` to include
adding `PropTypes` from my `flow` definitions, for my `React` components that I
publish to `npm`.

This works pretty much the same as when you are building a website, but where
you would normally be using something like [webpack] to bundle, watch and update
your bundles, instead you use the [babel-cli] to compile your code down to ES5
JavaScript, ready for publishing to `npm`.

This can be achieved by first installing the `babel-cli` and
`babel-plugin-flow-react-proptypes`.

```bash
yarn add --dev babel-cli babel-plugin-flow-react-proptypes rimraf
```

> [rimraf] is the `rm -rf` util for node.js

Then by setting up your `babelrc`.

```json
{
  "presets": ["..."],
  "plugins": ["flow-react-proptypes"]
}
```

And finally setting up builds command in your `package.json`.

```json
{
  "scripts": {
    "build": "npm run build:clean && npm run build:dist",
    "build:clean": "rimraf dist",
    "build:dist": "babel src --out-dir dist"
  }
}
```

That's all there is to it!

## Real world example

This is taken from a react component I built that renders markdown,
[react-markdown-renderer](https://github.com/InsidersByte/react-markdown-renderer).

```js
/* @flow */

import React from 'react';
import Remarkable from 'remarkable';

type PropsType = {
  markdown: string,
  options?: Object,
};

export default function MarkdownRenderer({
  markdown,
  options = {},
  ...props
}: PropsType) {
  const remarkable = new Remarkable(options);
  const html = remarkable.render(markdown);

  return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
```

Source.

```js
function MarkdownRenderer(_ref) {
  var markdown = _ref.markdown,
    _ref$options = _ref.options,
    options = _ref$options === undefined ? {} : _ref$options,
    props = _objectWithoutProperties(_ref, ['markdown', 'options']);

  var remarkable = new _remarkable2.default(options);
  var html = remarkable.render(markdown);

  return _react2.default.createElement(
    'div',
    _extends({}, props, { dangerouslySetInnerHTML: { __html: html } })
  );
}

MarkdownRenderer.propTypes = {
  markdown: require('react').PropTypes.string.isRequired,
  options: require('react').PropTypes.object,
};
```

Compiled Source. (Some code has been removed to make reading easier).

## Shipping flow definitions in `npm` packages

Now that we have shipped `PropTypes` in our `npm` packages we can extend our
packages to also include our `flow` definitions.

You start by install
[flow-copy-source](https://github.com/AgentME/flow-copy-source).

```bash
yarn add flow-copy-source --dev
```

And finally setting up builds command in your `package.json`.

```json
{
  "scripts": {
    "build": "npm run build:clean && npm run build:dist",
    "build:clean": "rimraf dist",
    "build:dist": "babel src --out-dir dist",
    "build:flow": "flow-copy-source src dist"
  }
}
```

`flow-copy-source` will (by default) copy all `*.js` files in `src` and copy
them into the target directory `dist`, all while preserving the original
directory hierarchy. The files that are copied get a different file-ending,
called `*.js.flow`.

This works because `flow` resolves modules in the same way as `node` does. If
you are importing `my-lib`, by default `flow` will look into `my-lib` and try to
find the type definitions, but unfortunately all of our files get compiled into
ES5 code, so we loose all of our type definitions.

Luckily if `flow` finds files with a `*.js.flow` file ending, it will prefer
them over the actual `*.js` file. So by including the additional files, we will
inform `flow` about the types that are exposed by our ES5 file.

> [ryyppy](https://twitter.com/ryyppy) wrote a
> [great article](https://medium.com/@ryyppy/shipping-flowtype-definitions-in-npm-packages-c987917efb65)
> on this, it's well worth a read.

## Future Posts

* getting started with `flow`
* in depth migrating from `PropTypes` to `flow`

[flow]: https://flowtype.org/
[proptypes]: https://facebook.github.io/react/docs/typechecking-with-proptypes.html
[react]: https://facebook.github.io/react/
[babel]: https://babeljs.io
[babel-cli]: https://babeljs.io/docs/usage/cli/
[babel-plugin-flow-react-proptypes]: https://github.com/brigand/babel-plugin-flow-react-proptypes
[webpack]: http://webpack.github.io/docs/
[rimraf]: https://github.com/isaacs/rimraf
