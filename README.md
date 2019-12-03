# Social Linker - Visual Studio Code Edition

Taking the code from the [social linker](https://github.com/MaximRouiller/social-linker) and taking it to an extension.

## Why

I initially created the social linker to provide a way to create trackable link for Cloud Advocates. As we are using WebTrends to identify events, we are tracking with the `WT.mc_id=` code.

It has become clear that tracking links in our blog posts on multiple platforms has become a pain as multiple links need to be tracked. 

## What's a `WT.mc_id` code

That code however is a template. `WT.mc_id=TEMPLATE`.

The template is split with the character `-` is has 3 components: the event, the channel, and the alias. 

Eg:

* `social-twitter-marouill` would mean a link shared on twitter for a generic social interaction by the person `marouill`.
* `social-reddit-marouill` would mean a link shared on reddit for a generic social interaction by the person `marouill`.
* `build2019-twitter-marouill` would mean a link shared on twitter for the BUILD 2019 event by the person `marouill`.

## This tool

This tool will not focus on social media. As most tweets/reddit posts/hackernews posts aren't written down in markdown before sending, this tool will focus on the blog post side of the equation.

People are writing content for `dev.to`, their own personal blogs or simply using markdown as a great tool to copy/paste from.

## The goal

The goal of this tool is to make it as easy as possible to massively tag all links that targets Microsoft properties (`*.microsoft.com`, etc.) and add/replace the tracking code automatically.

## Requirements

Requirements can be found in the issues and will be tagged appropriately.

## Contributors

TBD
