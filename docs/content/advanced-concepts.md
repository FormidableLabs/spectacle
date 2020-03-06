---
title: Advanced Concepts
order: 2
---

<a name="advanced-concepts"></a>

# Advanced Concepts

<a name="build--deployment"></a>

## Build & Deployment

There are a variety of ways to host your Spectacle presentation.

1. If you are integrating this lib yourself, take your build and follow the linked instructions from any of (but not limited to) this list of providers:

   - [Heroku](https://devcenter.heroku.com/articles/git#deploying-code)
   - [Zeit](https://zeit.co/docs/v2/platform/deployments)
   - [Surge](https://surge.sh/help/deploying-continuously-using-git-hooks)

2. If using `spectacle-cli` (either `spectacle --action build` or `spectacle-boilerplate` with `yarn clean && yarn build`) your output is `dist/` and upload that directory to any of the above static hosting providers.

<a name="keyboard-controls"></a>

## Keyboard Controls

| Key Combination | Function               |
| --------------- | ---------------------- |
| Right Arrow     | Next Slide             |
| Left Arrow      | Previous Slide         |
| Alt/Option + O  | Toggle Overview Mode   |
| Alt/Option + P  | Toggle Presenter Mode  |
| Alt/Option + F  | Toggle Fullscreen Mode |

<a name="query-parameters"></a>

## Query Parameters

A handful of query parameters are supported within your Spectacle presentation.
Append your URL with one of the following parameters, like so: `&<parameter>=true`.
To combine parameters, use multiple `&` to separate the parameters, e.g.: `&exportMode=true&printMode=true`

| Parameter       | Description of Use                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `exportMode`    | For exporting your presentation as a PDF. Add it to your project URL and "Save to PDF" directly from the browser                                                   |
| `printMode`     | Turns your slideshow into a printer-friendly, black & white version. Meant for use concurrently with `?exportMode` e.g. `?exportMode&printMode`                    |
| `presenterMode` | Displays a Presenter Mode for ease of presentation. For more info on this mode, please see [Presenting](/docs/basic-concepts#presenting) in our Basic Concepts doc |
