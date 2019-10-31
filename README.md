# Spectacle

<!-- @TODO BADGES -->

✨ A ReactJS based Presentation Library ✨

<!-- Looking for a quick preview of what you can do with Spectacle? Check out our Live Demo deck [here](). -->

Have a question about Spectacle? Submit an issue in this repository using the "Question" template.

<!--
## Table of Contents
@TODO - automate this
-->

## Getting Started

First, you'll have to decide how you want to use Spectacle. There are a couple of different ways to build your presentation.

## Development

```sh
yarn add spectacle
```

## Build & Deployment

<!-- @TODO will we have an out-of-the-box solution for deployment? -->

```sh
yarn run build
```

## Presenting

Spectacle comes with a built-in Presenter view. It shows you a slide lookahead, your current slide and related notes, and the current time.

![Screenshot of Spectacle's Presenter view with a clock]()

You also have the option of a stopwatch to count the elapsed time.

![Screenshot of Spectacle's Presenter view with a stopwatch]()

To present,

1. Run `yarn start`
2. Navigate to [localhost:3000/#](https://localhost:3000/#) to view your presentation
3. Open a second browser window and navigate to [localhost:3000/#/0?presenter](http://localhost:3000/#/0?presenter) to view your presentation with notes and a clock. Add [?presenter&timer](http://localhost:3000/#/0?presenter&timer) to switch from a clock a timer.

<!--
## Controls

| Key Combination | Function                       |
| --------------- | ------------------------------ |
| Right Arrow     | Next Slide                     |
| Left Arrow      | Previous Slide                 |
| Space           | Next Slide                     |
| Shift+Space     | Previous Slide                 |
| Alt/Option + O  | Toggle Overview Mode           |
| Alt/Option + P  | Toggle Presenter Mode          |
| Alt/Option + T  | Toggle Timer in Presenter Mode |
| Alt/Option + A  | Toggle autoplay (if enabled)   |
| Alt/Option + F  | Toggle Fullscreen Mode         |
-->

## Basic Concepts

### Layouts

@TODO

### Themes

@TODO

## Tag API

## FAQ

Can I write my presentation in TypeScript?

Can I easily create templates?

Can I export my slides for use elsewhere?

What is the preferred way to deploy a Spectacle presentation?
