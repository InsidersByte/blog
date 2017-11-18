---
path: "/my-development-stack"
date: "2016-04-16T07:17:13.000Z"
title: "My Development Stack"
tags: []
---

![lego](https://insidersbyte.blob.core.windows.net/ghost/2017/09/lego.jpg)

> This post is still a work in progress.

I am always looking to improve and keep my development stack up to date, over
the last few years it has changed a lot! I started with a Microsoft based stack
of ASP.NET MVC and jQuery, to ASP.NET Web Api and Angular, to my current stack
of Node and React.

I thought I would detail my current stack and any helpful resources I have found
along the way for those interested. I would also love to hear from you on what
you use or if you have any suggested improvements. I also thought that I would
include some of the things I will be looking at in the future.

> I do use a mac for development so some of these might not be available to you,
> but most of them should be.

# Font-end

#### [react](https://facebook.github.io/react/)

#### [react-router](https://github.com/reactjs/react-router)

#### [alt](http://alt.js.org/)

Alt is a [flux](https://facebook.github.io/flux/) implementation and is in fact
built on top of flux.

There are a lot of flux implementations out there, a quick google will find 10+
alternatives.

The general principle are to remove a lot of the boilerplate code surrounding
using vanilla flux, so that you are free to get on with more important things.

I choose alt as it was recommended on a few blog posts that I had read. The only
other implementation I have used is vanilla flux and I can say that alt is nicer
to use and involves a lot less boilerplate.

#### [angular 1.x](https://angularjs.org/)

#### [stylus](http://stylus-lang.com/)

Stylus is a css preprocessor, similar to less and sass.

Before migrating to stylus, I almost exclusively wrote vanilla css. I reached
one of my many points when I decided I wanted to learn something new, so I
thought I would look into learning one of the css preprocessors. I decided to
look at less, sass and stylus and I really liked the stripped down, significant
whitespace that stylus had to offer, I thought this made it really clean and
easy to read and saved on a lot of typing (I mean who really wants to have to
put loads of colons, semi-colons and braces everywhere)!

I have been using it for almost a year now and would really recommend it to
anyone looking to learn a css preprocessor.

#### [BEM naming](http://getbem.com/naming/)

#### [CSS modules](https://github.com/css-modules/css-modules)

#### es6/es7

http://es6-features.org

# Back-end

#### [Node](https://nodejs.org/en/)

#### [nvm](https://github.com/creationix/nvm)

#### [Express](http://expressjs.com/)

#### [Mongoose](http://mongoosejs.com/)

#### [sequelize](http://docs.sequelizejs.com/en/latest/)

#### [Nodemailer](https://github.com/nodemailer/nodemailer)

#### [Jade](http://jade-lang.com/)

# Developer Tools

#### [WebStorm](https://www.jetbrains.com/webstorm/)

#### [Android Studio](http://developer.android.com/tools/studio/index.html)

#### [Chrome](https://www.google.com/chrome/)

# Build Tools

#### [npm](https://www.npmjs.com/)

#### [webpack](https://webpack.github.io/)

#### [babel](https://babeljs.io/)

# Testing

#### [jest](https://facebook.github.io/jest/)

#### [mocha](https://mochajs.org/)

#### [istanbul](https://github.com/gotwarlost/istanbul)

#### [eslint](http://eslint.org/)

#### [airbnb config](https://github.com/airbnb/javascript)

#### [travis ci](http://travis-ci.org)

#### [circle ci](http://circleci.com)

#### [coveralls](https://coveralls.io/)

#### [Code Climate](https://codeclimate.com/)

#### [David](http://david-dm.org)

David describes itself pretty well, so why reinvent the wheel!

> David gets you an overview of your project dependencies, the version you use
> and the latest available, so you can quickly see what's drifting. Then it's
> all boiled down into a badge showing the current status, which you can embed
> on your site.

I use it on all of my (latest) open source projects
([see my github page](http://github.com/insidersbyte)) and with a glance of the
README see if the project dependencies are up to date.

If I need to update my npm packages I use a little utility called
[npm-check-updates](https://www.npmjs.com/package/npm-check-updates). It is
really useful as it checks for the latest stable version and updates my
package.json with the new version.

# Source Control

#### [GitHub](https://github.com/)

#### [Bitbucket](https://bitbucket.org/)

#### [Sourcetree](https://www.sourcetreeapp.com/)

# Badges

#### [Shields IO](http://shields.io/)

#### [NodeICO](https://nodei.co/)

# Project Management

#### [GitHub Issues](https://guides.github.com/features/issues/)

#### [Trello](https://trello.com/)

# Hosting

#### [OpenShift](https://www.openshift.com/)

#### [Heroku](https://www.heroku.com/)

#### [AWS](http://aws.amazon.com/)

#### [mLab (formerly MongoLab)](https://mlab.com/)

# Databases

#### [MongoDB](https://www.mongodb.org/)

#### [PostgresSQL](http://www.postgresql.org/)

#### [Robomongo](https://robomongo.org/)

#### [pgAdmin](http://www.pgadmin.org/)

# Other helpful tools

#### [Ghost](https://ghost.org/developers/)

#### [CloudFlare](https://www.cloudflare.com/)

#### [namecheap](https://www.namecheap.com/)

#### [iTerm (mac)](https://www.iterm2.com/)

#### [Homebrew (mac)](http://brew.sh/)

#### [Sunrise Calendar](https://calendar.sunrise.am/)

#### [Slack](https://slack.com/)

#### [mitmproxy](https://mitmproxy.org/)

#### [JSDoc](http://usejsdoc.org/)

#### [Real Favicon Generator](http://realfavicongenerator.net/)

# Things to look at in the future

#### [GreenKeeper](https://greenkeeper.io/)

#### [Let's Encrypt](https://letsencrypt.org/)

#### [Docker](https://www.docker.com/)

#### [Vagrant](https://www.vagrantup.com/)

#### [Inch CI](http://inch-ci.org/)

#### [Electron](http://electron.atom.io/)

#### [React Native](https://facebook.github.io/react-native/)

#### [Doclets](https://doclets.io/)

#### [Immutable.js](https://facebook.github.io/immutable-js/)

#### [React A11y](https://github.com/reactjs/react-a11y)

#### [Enzyme](https://github.com/airbnb/enzyme)

#### [Flow](http://flowtype.org/)

#### [HockeyApp](https://www.hockeyapp.net/features/)

#### [CodePush](https://microsoft.github.io/code-push/index.html)

#### [Realm](https://realm.io/)
