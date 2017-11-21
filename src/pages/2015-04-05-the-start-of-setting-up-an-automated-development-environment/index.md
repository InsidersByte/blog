---
path: "/automated-development-environment"
date: "2015-04-05T09:44:00.000Z"
title: "The start of setting up an automated development environment"
tags: []
---

I know I haven't posted for a little while. I have been looking into some new
things. For the most part I do .Net development and use the various different
Microsoft technologies available, like TFS, MVC, Web Api, etc.

I have now embarked on a little home project and wanted to learn some new
skills. So I brought a
[Lenovo Thinkserver TS140](http://www.ebuyer.com/670719-lenovo-thinkserver-ts140-4gb-xeon-e3-1226-v3-3-3ghz-1tb-hdd-tower-server-70a50022uk)
from ebuyer and got to work.

#####Hypervisor I knew very little about this when I started, I had created
virtual machines on my development machine using virtualbox and vmware player,
but I have never had to setup a decidated machine for it. Therefore when I
started I wasn't quite sure what I needed to do to set it all up. I looked
around on the internet and spoke to a few people and settled on vmware ESXI.

Installing ESXI was pretty easy. I used a tool called rufus
([download here](https://rufus.akeo.ie/)) to create a bootable usb drive and
then installed ESXI to the same usb drive during installation.

After setting it up I have made only a few changes to my installation, the only
ones of note were adding the hard drive as a datastore and setting a static ip.
Apart from that my setup is pretty much default.

It is really easy to setup and create new virtual machines.

##Things I am working on at the moment #####Puppet I am currently looking into
setuping up my environment to be maintable, predictable and recreatable. So I am
looking into puppet again this is another skill I wanted to learn as well.

I am currently going through a couple of tutorials on this subject.

1. [Pluralsight course - puppet system adminstrators fundamentals](http://www.pluralsight.com/courses/puppet-system-administrators-fundamentals)
2. [Puppet's offical learn course](https://puppetlabs.com/learn)

#####Jenkins Another technology I am looking into is continous intergration and
continous delivery. I have worked mainly with TFS before, but at home I don't
want to have to pay the fee for a license so I am using Jenkins on a linux
distro.

Again I have been watching a course at pluralight for this one,
[Jenkins introduction](http://www.pluralsight.com/courses/jenkins-introduction).

#####MEAN Stack I am normally a .Net developer day to day but I have wanted to
learn something new so for my new project at home I have been looking to learn
the MEAN stack, again this does have the advantage of running on a linux VM so
no license fees, although VNext support on linux is supposed to be pretty good
even though it is still in beta.

Again it is another pluralsight video
[building angularjs nodejs apps mean](http://www.pluralsight.com/courses/building-angularjs-nodejs-apps-mean)

#####GitLab I wanted to host my own code, I have recently been using BitBucket
for all my home projects, but looking into jenkins if I wanted web hooks I would
have to open up access to my build server externally and I didn't want to have
to go through that hassle. So I decided to install
[GitLab](https://about.gitlab.com/).

##Overall Goal The overall goal for this project is to have the starting blocks
in place for a fully functionaly automated environment at home. Each service I
have is installed on it's own dedicated virtual machine. I also want to be able
to teardown and recreate if need any machine and have the ability to do so
without fear!

I will be writing more posts in the future regarding everything I have been
doing.
