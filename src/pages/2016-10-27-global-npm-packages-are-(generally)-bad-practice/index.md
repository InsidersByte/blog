---
path: "/global-npm-packages-are-generally-bad-practice"
date: "2016-10-27T19:41:00.000Z"
title: "Global npm packages are (generally) bad practice"
image: "./images/npm-logo.png"
tags: ["npm","node","best-practices"]
---

## What are npm packages

If you aren't sure what npm packages are it's probably worth reading up on them
before continuing with this post,
[https://docs.npmjs.com](https://docs.npmjs.com).

There are two different ways to install them,
[locally](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
and
[globally](https://docs.npmjs.com/getting-started/installing-npm-packages-globally).

Local packages are all of the packages that a project depends on and are defined
in the `package.json` file.

Global packages are all of the packages that are installed at the global scope
and are installed with the `-g` (or `--global`) flag.

## What types of global packages are there

Before I get to the problem, I want to identify the different types of global
packages. Most globally installed packages are CLIs and there are two different
types:

1. **Non-project dependencies** - These are non-project dependencies, some
   examples of these are
   [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) and
   [create-react-app](https://www.npmjs.com/package/create-react-app).

1. **Project dependencies** - These are packages that a project a project
   depends on, some common ones here are
   [bower](https://www.npmjs.com/package/bower),
   [gulp](https://www.npmjs.com/package/gulp),
   [grunt-cli](https://www.npmjs.com/package/grunt-cli).

## So what is the issue

**Non-project dependencies** don't have one, so carry on using them exactly the
same!

**Project dependencies** on the other hand do, which are:

1. They are an extra install step, as you have to run `npm install -g PACKAGE`
   as well as `npm install`.

1. They aren't listed as a dependency in your `package.json`.

The first issue is a minor one, as you need to keep your documentation up to
date with what global packages need to be installed and you create an
(unnecessary) install step.

**The second issue is a real problem**, it easily becomes a problem because the
version is not specified, so when you run `npm install -g PACKAGE` it will
install the very latest version of the package, which might be one or more major
/ (minor) [semver](http://semver.org/) versions from the version that the
project was initially built with. This could cause lots of issues as the package
might have drastically (or minorly) changed its API, which means things might
break!

> It's quite difficult to find the original version that was used, as it's not
> tracked anywhere.

## How do we fix this

We can fix this by treating it similarly to other dependencies, first by
installing it as a dependency `npm install --save(-dev) PACKAGE`, when
installing npm packages locally anything that is designed to be run on the
command line will be installed in `./node_modules/.bin`.

This now means that when someone runs `npm install` it will install everything
that is required so that extra install step is no longer required!

For example, if you install gulp with `npm install --save-dev gulp` you can run
it by typing `./node_modules/.bin/gulp` in your console.

Problem solved!

Well not quite, it's really annoying to have to type that every time you want to
run gulp. Luckily there is a solution for that too!

When running npm scripts, npm will first look in the `./node_modules/.bin` to
see if there is an executable in there before checking your `PATH`.

This means if you add something like this to your `package.json`.

```json
{
    ...
    "scripts": {
        "gulp": "gulp"
    }
}
```

You can now run gulp with `npm run gulp`. If you need to pass additional
parameters you can do so with `--` so `gulp build` becomes `npm run gulp --
build`.

## Congratulations

Hopefully having gone through this you see the benefits of moving global package
dependencies into your control and how this is achieved.

## A sidenote on Bower Install

One thing I see quite often with a front end project is an additional build step
for bower, beyond the global install, you have to then additionally do a `bower
install`.

This can be improved by using the above solution and a `postinstall` script (see
the [docs](https://docs.npmjs.com/misc/scripts)).

1. **Install Dependency** - run `npm install --save-dev bower`.
2. **Add postinstall script** - see below.

```json
{
    ...
    "scripts": {
        "postinstall": "bower install"
    }
}
```

This means that running `npm install` installs all of the project dependencies!
