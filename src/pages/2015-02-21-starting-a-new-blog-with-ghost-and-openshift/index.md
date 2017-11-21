---
path: "/setting-up-ghost-on-openshift"
date: "2015-02-21T11:45:12.000Z"
title: "Starting a New Blog With Ghost and Openshift"
tags: ["ghost","openshift"]
---

I recently decided to start a development blog. So I thought my first blog would
be about how I set up my blog and what I learnt in doing so.

So I decided to compile a mini tutorial comprising of five parts, which go
through the steps involved in starting up a Ghost blog on OpenShift using my
experiences. The topics covered so far are:

1. Starting a New Blog With Ghost and Openshift (This Post)
2. [Git Clone Your OpenShift Ghost Blog](https://www.insidersbyte.com/git-clone-your-openshift-ghost-blog/)
3. [Update Your Ghost Blog](https://www.insidersbyte.com/update-your-openshift-ghost-blog/)
4. [Use a Custom Domain for Your Ghost Blog](https://www.insidersbyte.com/use-a-custom-domain-for-your-openshift-ghost-blog/)
5. Free SSL For Your Ghost Blog (Coming soon)

###Outcome of This Tutorial Have a free Ghost blog hosted on OpenShift.

###Blogging Platform Choice

For my blogging platform I wanted something that was clean, simple and easy to
set up. I looked around for a little bit and settled on
[Ghost](https://ghost.org/).

###Blogging Platform Choice

After deciding on a platform the next step was to figure out where to host it so
that I could get everything setup and ready to go. I originally decided to use
Azure to host my blog as you can have 10 free websites, can scale the site as
the need arises and I had used it before. However after starting with Azure I
soon found out that you cannot have a custom domain for a free site. After some
looking around I came upon [OpenShift](https://openshift.redhat.com) so I
thought I would give that a go.

###Let's Get On With Deployment

After creating a new OpenShift account you need to create your new application.
I followed the instructions from
[OpenShift's Ghost quickstart guide](https://www.openshift.com/quickstarts/ghost),
it included a few steps:

* Create a new application with this link
  [Quick deploy](https://hub.openshift.com/quickstarts/240-ghost-0-7-5)
* Setup up
  [rhc tools](https://developers.openshift.com/en/managing-client-tools.html)
  (there is quite a bit to setting up this)
* run `rhc set-env NODE_ENV=production --app $appname`
* run `rhc app restart $appname`

> Where $appname is the name of your Ghost application.

###Congratulations Congratulations you have now setup your new blog site.
