---
path: "/unity-auto-resolver"
date: "2015-08-17T17:08:00.000Z"
title: "Unity Auto Resolver"
tags: ["Unity","Dependency Injection","DI","C#","Visual Studio"]
---

I have been using Unity ([docs found here](https://unity.codeplex.com/)) for a
little while now and one thing that annoyed me was having to explicitly declare
every mapping from my an interface to a class, especially when I only had one
Interface to one Class!

This was leading to a couple of issues: the first being that (especially with a
large project) you ended up with a massive unity config file; the second is that
you had to remember to wire up every new Interface and Class you created and if
you didn't you got exceptions, which is annoying and tedious.

##Auto Resolver

I have found a solution to this issue by making use of Unity's Auto Resolver.
The configuration of this is shown below.

```c#
container.RegisterTypes(
                AllClasses.FromLoadedAssemblies(),
                WithMappings.FromMatchingInterface,
                WithName.Default,
                WithLifetime.Transient);
```

It maps everything where the interface matches the name and there is only one
class per interface, all for you!

##Problem Solved That is it, problem solved. I would however (from experience)
only suggest you use this for new projects or carefully with existing projects,
this is because if you delete all of your current mappings you would need to
check the resolution of every object in your project, to be positive that it
works and that you do not get any missing mappings.
