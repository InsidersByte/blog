---
slug: "/promises-in-reason"
title: "Fetching data in Reason"
date: "2018-01-01T00:00:00.000Z"
featured: false
draft: false
tags: ["reason","ocaml","bucklescript"]
---

I been using `reason` for a while now, blah blah blah.

Fetching data from an API is a pretty common use case in almost any application.

This tutorial aims to introduce XXX.

For this tutorial we are going to be using [JSONPlaceholder](https://jsonplaceholder.typicode.com/) a _"Fake Online REST API for Testing and Prototyping"_.

I am assuming a knowledge of using the fetch api in js.

First up we need to install [bs-fetch](https://github.com/reasonml-community/bs-fetch), it is the `binding` library for [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in `reason`.

```bash
yarn add bs-fetch
```

```json
{
  "bs-dependencies": ["bs-fetch"]
}
```

## Basic Usage

So let's start by doing a basic query to fetch a post and log the result to the console.

Firstly we have to create a function that will take an id.

```reason{1}
let fetchPost = id => ()
```

This function takes an id and return a `unit`, which is special type in `reason` meaning no value.

Now we need to call fetch to get the post for the id we pass.

```reason{2-4}
let fetchPostAsText = id =>
  Fetch.fetch(
    "https://jsonplaceholder.typicode.com/posts/" ++ string_of_int(id),
  )
```

This will call then endpoint and blah blah blah.

Now we call `response.json()`

```reason{5}
let fetchPost = id =>
  Fetch.fetch(
    "https://jsonplaceholder.typicode.com/posts/" ++ string_of_int(id),
  )
  |> Js.Promise.then_(Fetch.Response.json);
```

Finally we call this function and log the result.

```reason{7-11}
let fetchPost = id =>
  Fetch.fetch(
    "https://jsonplaceholder.typicode.com/posts/" ++ string_of_int(id),
  )
  |> Js.Promise.then_(Fetch.Response.json);

fetchPost(1)
|> Js.Promise.then_(post => {
     Js.log(post);
     Js.Promise.resolve();
   });
```

Compiled js. If you're familiar with `Fetch` this probably looks quite familiar to you.

```js
var Pervasives = require('bs-platform/lib/js/pervasives.js');

function fetchPost(id) {
  return fetch(
    'https://jsonplaceholder.typicode.com/posts/' + Pervasives.string_of_int(id)
  ).then(function(prim) {
    return prim.json();
  });
}

fetch(1).then(function(post) {
  console.log('fetchPostAsJson:', post);
  return Promise.resolve(post);
});
```

## Decoding json to records

Currently bucklescript isn't great for working with JSON, so instead we are going to be using [@glennsl/bs-json](https://github.com/glennsl/bs-json), again by [glennsl](https://github.com/glennsl).

```bash
yarn add @glennsl/bs-json
```

```json
{
  "bs-dependencies": ["@glennsl/bs-json"]
}
```

The first thing we now need to do is to create the type of post based on the response below.

```json
{
  "userId": 1,
  "id": 1,
  "title":
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body":
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

```reason{1-8}
module Post = {
  type t = {
    id: int,
    userId: int,
    title: string,
    body: string,
  };
};
```

Now we need to create a method that converts from json into a Post.

```reason{8-14}
module Post = {
  type t = {
    id: int,
    userId: int,
    title: string,
    body: string,
  };
  let decode = json =>
    Json.Decode.{
      id: json |> field("id", int),
      userId: json |> field("userId", int),
      title: json |> field("title", string),
      body: json |> field("body", string),
    };
};
```

This does blah blah.

Now we need to wire it up.

```reason{22}
module Post = {
  type t = {
    id: int,
    userId: int,
    title: string,
    body: string,
  };
  let decode = json =>
    Json.Decode.{
      id: json |> field("id", int),
      userId: json |> field("userId", int),
      title: json |> field("title", string),
      body: json |> field("body", string),
    };
};

let fetchPost = id =>
  Fetch.fetch(
    "https://jsonplaceholder.typicode.com/posts/" ++ string_of_int(id),
  )
  |> Js.Promise.then_(Fetch.Response.json)
  |> Js.Promise.then_(json => json |> Post.decode |> Js.Promise.resolve);

fetchPost(1)
|> Js.Promise.then_(post => {
     Js.log(post);
     Js.Promise.resolve();
   });
```

delete this?

```json
[
  1,
  1,
  "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "quia et suscipit↵suscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto"
]
```

## What about fetching lists?

```reason
let fetchPosts = () =>
  Fetch.fetch("https://jsonplaceholder.typicode.com/posts/")
  |> Js.Promise.then_(Fetch.Response.json)
  |> Js.Promise.then_(json =>
       json |> Json.Decode.list(Post.decode) |> Js.Promise.resolve
     );
```

```json
[
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  ...
]
```

## Handling rejection

Right we have handled success, what about failure?

```reason
let fetchPostWithErrorHandling = id =>
  Fetch.fetch(
    "https://jsonplaceholder.typicode.com/posts/" ++ string_of_int(id),
  )
  |> Js.Promise.then_(response =>
       Fetch.Response.ok(response) ?
         response |> Fetch.Response.json :
         Failure(response |> Fetch.Response.statusText) |> Js.Promise.reject
     )
  |> Js.Promise.then_(json => json |> Post.decode |> Js.Promise.resolve);
```

but how do we handle it

The problem:

* Not exhaustive pattern matching
* Missing patterns
* Can't give something better than `something went wrong`

### A better way?

```reason

```
