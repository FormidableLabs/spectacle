# Spectacle

<!-- TODO BADGES -->

✨ A ReactJS based Presentation Library ✨

Looking for a quick preview of what you can do with Spectacle? Check out our Live Demo deck [here](https://spectacle.formidable.com).

Have a question about Spectacle? Submit an issue in this repository using the "Question" template.

<!--
## Table of Contents
TODO - automate this
-->

## Getting Started

First, you'll have to decide how you want to use Spectacle. There are a couple of different ways to build your presentation.

1. Using [**MDX**](https://mdxjs.com/)

   - Steps
   - To
   - Start
   - With an
   - MDX Presentation

2. Using [**Classic JSX**](https://reactjs.org/docs/introducing-jsx.html)

   - Steps
   - To
   - Start
   - With a
   - JSX Presentation

## Development

```sh
yarn add spectacle
```

### Basic Concepts

#### Layouts

#### Themes

### API

## Build & Deployment

<!-- TODO will we have an out-of-the-box solution for deployment? -->

```sh
yarn run build
```

## Presenting

Spectacle comes with a built-in Presenter view. It shows you a slide lookahead, your current slide and related notes, and the current time.

![Screenshot of Spectacle's Presenter view with a clock](TODO)

You also have the option of a stopwatch to count the elapsed time.

![Screenshot of Spectacle's Presenter view with a stopwatch](TODO)

To present,

1. Run `yarn start`
2. Navigate to [localhost:3000/#](https://localhost:3000/#) to view your presentation
3. Open a second browser window and navigate to [localhost:3000/#/0?presenter](http://localhost:3000/#/0?presenter) to view your presentation with notes and a clock. Add [?presenter&timer](http://localhost:3000/#/0?presenter&timer) to switch from a clock a timer.

## FAQ

Can I write my presentation in TypeScript?

Can I easily create templates?

Can I export my slides for use elsewhere?

What is the preferred way to deploy a Spectacle presentation?
