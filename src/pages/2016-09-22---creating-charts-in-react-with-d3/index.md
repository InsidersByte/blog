---
slug: "/creating-charts-in-react-with-d3"
date: "2016-09-22T06:37:20.000Z"
title: "Creating Charts in React with D3"
featured: true
draft: false
tags: ["react","d3"]
---

In this post, I am hoping to introduce a way of creating charts in React.js with
D3.js.

This isn't intended to be an in-depth tutorial but more to illustrate the
methodology. (I hope to write more posts in the future).

## The Project

I recently inherited a project that was written in Ember, Ruby, and D3.js, none
of which I have a huge amount of experience in.

The project itself was relatively small and all the complexity resides in a
single complicated interactive chart, that uses drag and drop. It was also built
as a prototype so was a little rough around the edges.

I decided that as I would be needed to extend and support this I would rather do
it in a stack that I am more competent in. For this reason, I went with Node.js,
React.js, and D3.js.

> I must confess at the beginning of all this I knew very little D3 and even
> less about SVG and I wasn't sure this would be possible.

## Chart Requirements

1. Must be written in React and not D3
1. Chart data must be stored in Redux or local state (as appropriate) and not
   internal to D3
1. React must do all of the rendering

## The search for a library

Where I work in JavaScript land my first thought was to go in search of a
library that would work for me.

However, after a fairly exhaustive search, I found that nothing quite met my
needs.

I felt that most of the libraries were focused on integrating D3 and React, and
not creating charts with React.

> I later found [Victory](https://github.com/FormidableLabs/victory) by
> [Formidable Labs](https://github.com/FormidableLabs), however, it didn't quite
> have the functionality I needed.

So with libraries out of the picture, I went to look for inspiration as to how I
could build this myself and I found this post
http://www.adeveloperdiary.com/react-js/integrate-react-and-d3/.

## Basic Example

I started with a basic task of recreating a D3 pie chart in React. Now for the
interesting bit, some code!

To show a direct comparison I will reproduce this pie chart
https://bl.ocks.org/mbostock/3887235.

### Original

<p data-height="573" data-theme-id="0" data-slug-hash="dpOjQL" data-default-tab="js" data-user="insidersbyte" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/insidersbyte/pen/dpOjQL/">dpOjQL</a> by InsidersByte (<a href="http://codepen.io/insidersbyte">@insidersbyte</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### React

<p data-height="573" data-theme-id="0" data-slug-hash="WGogNj" data-default-tab="js" data-user="insidersbyte" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/insidersbyte/pen/WGogNj/">WGogNj</a> by InsidersByte (<a href="http://codepen.io/insidersbyte">@insidersbyte</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

This is just a basic example, but hopefully, it should prove the point.

The data and size of the chart are stored in the state of the application and
based down as props to the pie chart. D3 is used as a utility in this setup and
is not actually rendering anything.

## What have we learned

That it is possible to create charts in React!

> I continued to use this method to create the complex initiative chart for my
> project as I mentioned above and it worked really well!

One thing I found difficult is translating pure D3 code, it can take a bit of
time to get your head around it.

## Future Posts

* In depth tutorial
* Drag and Drop
* Undo / Redo
* Reponsive Chart
