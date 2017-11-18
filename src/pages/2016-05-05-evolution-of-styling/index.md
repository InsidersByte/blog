---
path: "/evolution-of-styling"
date: "2016-05-05T20:00:16.000Z"
title: "Evolution of Styling"
tags: ["React","React.js","js","JavaScript","CSS","CSS Modules","Radium","Inline Styles","Styling","PostCSS","autoprefixer","webpack","bootstrap","stylus","styl","Pluralsight","Jake Trent","Vjeux","Status Quo","Evolution of Styling"]
---

![](https://insidersbyte.blob.core.windows.net/ghost/2017/09/css-modules-logo-small.png)

# The Evolution of Styling in [React](https://facebook.github.io/) from CSS to CSS Modules and everywhere in between

I recently decided to look at the various different styling options that are
available in React.

I took to [Pluralsight](http://pluralsight.com) and watched a great video called
[Styling React Components](https://app.pluralsight.com/library/courses/react-styling-components/table-of-contents)
by [Jake Trent](https://twitter.com/jaketrent). This post is inspired by that
video.

## Challenging the Status Quo

It all started with a [talk](https://speakerdeck.com/vjeux/react-css-in-js) on
styling in React by [Vjeux](https://twitter.com/vjeux?lang=en-gb) about how we
should challenge the status quo, which seems to be a reoccurring theme with
React! Vjeux states that the problems with CSS at scale are:

1. Global Namespace
2. Dependencies
3. Dead Code Elimination
4. Minification
5. Sharing Constants
6. Non-deterministic Resolution
7. Isolation

## The Evolution of Styling in React

CSS -> [Inline Styles](https://facebook.github.io/react/tips/inline-styles.html)
-> [Radium](https://github.com/FormidableLabs/radium) ->
[CSS Modules](https://github.com/css-modules/css-modules)

#### CSS

I was using this first stage of the evolution in my project. It is plagued with
the problems that you all know and love!

> I was using [BEM](http://getbem.com/) to avoid classname conflicts.

#### [Inline Styles](https://facebook.github.io/react/tips/inline-styles.html)

This is what was first proposed by Vjeux, it solves all of the problems he
illustrated with CSS. I have used it personally, that might have been more
laziness for not extracting it out to a stylesheet!. However it is not all
wondrous as you lose functionality for:

* Media Queries
* Pseudo Selectors
* Keyframe Animations

#### [Radium](https://github.com/FormidableLabs/radium)

Along came Radium, which is inspired by Vjeux talk. Jake Trent described Radium
as `radium = inlineStyles++`. It builds upon the idea of inline styles and
solves the issue with the missing functionality of Inline Styles that was
mentioned above. This looks to be really good solution to styling in React,
however you miss out on the
[PostCSS Ecosystem](https://github.com/postcss/postcss) as all your styles are
inlined.

> The most popular CSS processor is
> [autoprefixer](https://github.com/postcss/autoprefixer) which adds vendor
> prefixes to your CSS and is
> [recommend](https://developers.google.com/web/tools/setup/setup-buildtools#dont-trip-up-with-vendor-prefixes)
> by Google.

#### [CSS Modules](https://github.com/css-modules/css-modules)

CSS Modules are awesome and I love them! I will go into more detail about how
they work and why they are so awesome. They solve most of the problems laid out
by Vjeux, but Jake Trent mentions that they do not solve `Sharing Constants`. As
this is CSS though we can run it through PostCSS.

## So what are CSS Modules?

To quote from the official repository:

> A CSS Module is a CSS file in which all class names and animation names are
> scoped locally by default.

This is great as it provides a way to scope CSS to a individual component and
avoids the global namespace dilemma.

It also fixes the problem with naming as everything is scoped locally you can
have classes repeat throughout your project, so if something is a title you can
use a class of `.title` and if another component has a title, you can use a
class of `.title` again without the names clashing! So no need for BEM.

## How do they work?

CSS Modules need to be piped in a build step, which means they do not work by
themselves.

The basics are that you require a CSS file from within a JavaScript module (such
as, but not exclusively, a React component), CSS Modules will then define a
object mapping the class names from the file to dynamically scoped class names.

Here is a basic example:

```
.className {
  color: blue;
}
```

```javascript
import styles from './style.css';
// import { className } from "./style.css";

element.innerHTML = `<div class="${styles.className}">
  I love CSS Modules.
</div>`;
```

After running the build steps it will generate something similar to this:

```
<div class="_1X4e_uaGgBSK9k2dt0VkGj">I love CSS Modules.</div>
```

```
._1X4e_uaGgBSK9k2dt0VkGj {
  color: blue;
}
```

## Globals

Sometimes you still need globals or you need to extend something that uses
global classes (like bootstrap). This is easy to do all you need to do is use
`:global()`. So for example if you want to override the `border-color` of a
button link in bootstrap you do (this is an extract from my login form):

```
:global(.btn-link).forgottenLink {
  border-color: rgb(204, 204, 204);
}
```

```javascript
import css from './LoginForm.css';

return (
  <Button className={css.forgottenLink} bsStyle="link" onClick={props.onForgot}>
    Forgot?
  </Button>
);
```

> I am using [React-Bootstrap](https://react-bootstrap.github.io/).

## Composition

CSS Modules also have a handy feature that can be used to extend styles from
another module, this basically works the same way as @extend in Stylus. It does
not copy the styles but instead concatenates selectors to extend styles.

```
.base {
  composes: appearance from '../SomeOtherModule/styles.css';
}
```

## Naming Convention

For local class names camelCase naming is recommended, but not enforced.

This is because when you import in your CSS Module it is an object.

`.scrollDown` -> `css.scrollDown` vs `.scroll-down` -> `css['scroll-down']`

## Getting Started

You can use either [webpack](https://webpack.github.io/) or
[Browserify](http://browserify.org/) to enable CSS Modules. I have only used
webpack so I will go through how to configure that and show a usage with react.

In the webpack.config.js, add the following configuration to tell webpack to
treat CSS files with CSS Modules:

```javascript
{
  test: /\.css$/,
  loaders: ['style', 'css?modules'],
  include: PATHS.PUBLIC, // the path to your source directory
},
```

> It is the `?modules` query string that enables CSS Modules within the CSS
> Loader.

> Make sure to have have an include path if you depend on any 3rd party CSS like
> bootstrap otherwise it will convert Bootstrap to CSS Modules. Which is
> probably not something you want!

That's it! Really simple isn't it, well assuming you already have a webpack
build setup.

> Setting up a webpack build from scratch isn't something that is covered by
> this post, but I might cover at a later date. However I will be providing a
> link to my latest project which has everything setup in it.

## React Example

Here is a example React usage with CSS Modules. I use
[Stylus](http://stylus-lang.com/) in my project but the concept is the same.

```stylus
.root
  display flex
  flex-direction column
  justify-content center
  align-items center
  min-height 75%
  margin 0 10px 15px 10px
  text-align center

.title
  margin-bottom 50px
  font-size 2em

.content
  margin-bottom 30px
```

```javascript
import React from 'react';
import { Link } from 'react-router';
import { HOME_ROUTE } from '../../constants/routeConstants';

import css from './ConfirmationPage.styl';

export default function ConfirmationPage() {
  return (
    <section className={css.root}>
      <h1 className={css.title}>Thank you very much for your gift!</h1>

      <div className={css.content}>
        <p>
          You will receive an email (this is still a work in progress) with your
          gift confirmation.
        </p>

        <p>
          We will then be in touch with our bank transfer details, as all
          payments are offline.
        </p>
      </div>

      <Link to={HOME_ROUTE} className="btn btn-success" role="button">
        Back to Home
      </Link>
    </section>
  );
}
```

## Real World Example

After I had learnt about CSS Modules I went and put them in place in my project,
it is open source and here is the
[pull request](https://github.com/InsidersByte/our-wedding-heroes/pull/167/files)
where I added them. Hopefully it will help you.
