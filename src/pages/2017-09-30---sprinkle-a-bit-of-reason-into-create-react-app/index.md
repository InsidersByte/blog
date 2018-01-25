---
slug: "/sprinkle-a-bit-of-reason-into-create-react-app"
date: "2017-09-30T09:53:54.000Z"
title: "Sprinkle a bit of Reason into Create React App"
image: "./images/reason-logo.png"
featured: true
draft: false
tags: ["react","reason","create-react-app","ocaml","bucklescript"]
---

So you've decided to hop on the `Reason` hype train and you want to try it out
in your app, the thing is you already have a big project using `Create React App` and don't want to have to rewrite it from scratch or eject and have to
manage everything yourself.

Enter [reason-scripts](https://github.com/reasonml-community/reason-scripts),
it's the `Reason` equivalent of
[react-scripts](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts)
and it's easy enough to move from one to the other, the great thing is that your
JavaScript code and `Reason` code are interoperable, so you can migrate your
components one at a time, instead of doing a great big rewrite, awesome!

> This isn't intended as an introduction to `Reason` or to sell `Reason` to you,
> it's intended to show you how you can start using it within an existing
> `Create React App` project.

> If you're looking for an introduction to Reason, I would recommend starting
> with the [docs](https://reasonml.github.io/guide/what-and-why).

> For `Reason` and `React`, I would start with:\
> [A ReasonReact Tutorial](https://jaredforsyth.com/2017/07/05/a-reason-react-tutorial/)
> by [@jaredforsyth](https://twitter.com/jaredforsyth)\
> [A First Reason React app for Javascript developers](https://jamesfriend.com.au/a-first-reason-react-app-for-js-developers)
> by [@ur_friend_james](https://twitter.com/ur_friend_james)

So let's get started.

> It is possible to create a new app using `reason-scripts` without having to go
> through this long-winded process, see their
> [guide](https://github.com/reasonml-community/reason-scripts#getting-started).

### Install packages

This part is the easy part!

Start by moving from react-scripts to reason-scripts.

```bash
yarn remove react-scripts
yarn add reason-scripts
```

Then you need to install
[bs-platform](https://github.com/bucklescript/bucklescript).

```bash
yarn add --dev bs-platform
```

Install [reason-reason](https://github.com/reasonml/reason-react).

```bash
yarn add --dev reason-react
```

Finally, install [bs-jest](https://github.com/reasonml-community/bs-jest)

```bash
yarn add --dev bs-jest
```

### Bucklescript config

`./bsconfig.json`

```json
{
  "name": "reason-scripts",
  "sources": ["src"],
  "bs-dependencies": ["reason-react", "bs-jest"],
  "reason": {
    "react-jsx": 2
  },
  "bsc-flags": ["-bs-super-errors"],
  "refmt": 3
}
```

### Migrate `./src/index.js` to `./src/index.re`

This part might take a bit more effort if you have added anything extra in your
index.js, assuming you haven't changed anything you can simply rename index.js
to index.re and copy and paste the snippet below, (the index.re might have
changed slightly in later versions, snippet is taken from v0.6.9 of
`reason-scripts`)

```reason
[%bs.raw {|require('./index.css')|}];

[@bs.module "./registerServiceWorker"] external register_service_worker : unit => unit = "default";

ReactDOMRe.renderToElementWithId(<Appre />, "root");

register_service_worker();
```

> If you have made some modifications the
> [ReasonML guide](https://reasonml.github.io/guide/javascript/converting) and
> the
> [reason-react guide](https://reasonml.github.io/reason-react/#reason-react-convert-over-reactjs-idioms)
> on migrating from js to reason should be helpful.

### Wrapping App.js

`./src/Appre.re`

```reason
[@bs.module "./App.js"] external reactClass : ReasonReact.reactClass = "default";

let make = (children) => ReasonReact.wrapJsForReason(~props=Js.Obj.empty(), ~reactClass, children);
```

### Add files to .gitignore

`.gitignore`

```
# bucklescript
/lib
/types
.merlin
```

### Done

If you run `yarn start` then everything should be working as before.

The completed source is
[on Github](https://github.com/InsidersByte/create-react-app-with-reason).
