---
path: "/update-your-openshift-ghost-blog"
date: "2015-02-25T23:40:29.000Z"
title: "Update Your Ghost Blog"
tags: ["Ghost","OpenShift","Blog","Update","Git"]
---

So I decided to compile a mini tutorial comprising of five parts, which go
through the steps involved in starting up a Ghost blog on OpenShift using my
experiences. The topics covered so far are:

1. [Starting a New Blog With Ghost and Openshift](https://www.insidersbyte.com/setting-up-ghost-on-openshift/)
2. [Git Clone Your OpenShift Ghost Blog](https://www.insidersbyte.com/git-clone-your-openshift-ghost-blog/)
3. Update Your Ghost Blog (This Post)
4. [Use a Custom Domain for Your Ghost Blog](https://www.insidersbyte.com/use-a-custom-domain-for-your-openshift-ghost-blog/)
5. Free SSL For Your Ghost Blog (Coming soon)

###Outcome of this tutorial Update your Ghost blog. I have followed the
instructions from the Ghost main website
[here](http://support.ghost.org/how-to-upgrade/), but I have also included some
extra steps involved with OpenShift.

###Prerequisites Have a ghost blog.

Although this guide is geared towards OpenShift it can be used to update any
Ghost blog.

###I have just created my blog why do I need to update it? I don't know about
you but I love updates, I update all of my devices as soon as an update is
available. Therefore it is important because at the time of writing the Ghost
version that OpenShift deploys is 0.5.0 and the most up to date version is 0.5.8
(we all want the new features that get added every release).

> I did also have an issue with Internet Explorer on Ghost 0.5.0, it failed to
> load certain parts of a blog post, but updating fixed it!

###Backup! If you have already written articles or have customised your blog,
you need to backup! This is just in case heaven forbid something goes wrong and
you lose your hard work.

* To backup all the data from your database, log into your Ghost install and go
  to `/ghost/debug/` (as of 0.5.6 `/ghost/settings/labs/`). Press the export
  button to download a JSON file containing all of your data. Job done!
* To back up your custom themes and images, you need to take a copy of the files
  inside of `content/themes` and `content/images` (although if you are using
  OpenShift's Ghost application the images folder is symlinked so no need to
  worry).

###Backup your Casper theme changes If you have made changes to the Casper theme
you need to remember what these were, so that you can add your additional
functionality back in after updating. This is because you have to delete the
contents of the casper folder and replace them with the new updated files.

If you haven't made changes to the default Casper theme or you don't know what I
am talking about don't worry we will be modifying this is later posts.

###Getting on with updating

1. Make sure you have backed up!
2. Download the latest release from [here](http://ghost.org/download)
3. Extract the zip file to a temporary location
4. Replace your existing index.js and package.json files with the new files
5. Delete the `core` folder and put the new on in it's place
6. Delete the `content/themes/casper` folder and put the new one in it's place
7. If you are using OpenShift you need to edit package.json and replace
   `./core/index` with `./index`
8. Open a command prompt in the root of your git repository
9. Run `git add -A`
10. Run `git commit -m "Updated Ghost"` (you can change 'Updated Ghost to
    whatever commit message you want)
11. Run `git push`
12. If you are using OpenShift you just have to wait as this will trigger the
    deployment of your blog if not you may have to manually deploy your blog

> Upon reading the instructions from Ghost when the first or middle version
> number changes E.g. 0.5.17 to 0.6.0, it is recommended that you don’t miss
> upgrading to the first of the new version number. E.g. if your blog is on
> 0.5.3, and Ghost latest is 0.6.2, you should upgrade to 0.6.0 and then to
> 0.6.2.

###Congratulations Well done you have now updated your blog to the latest
version. You can now use all the shiny new features!
