---
title: Basic Concepts
order: 1
---

<a name="basic-concepts"></a>

# Basic Concepts

<a name="installation"></a>

## Installation

<a name="development"></a>

# Development

After downloading the boilerplate, run the following commands on the project's root directory...

- `npm install` (you can also use `yarn`)
- `rm -R .git` to remove the existing version control
- `npm start` to start up the local server or visit [http://localhost:3000/#/](http://localhost:3000/#/)

... and we are ready to roll

<a name="build--deployment"></a>

# Build & Deployment

Building the dist version of the slides is as easy as running `npm run build:dist`

If you want to deploy the slideshow to [surge](https://surge.sh/), run `npm run deploy`

_<span role="img" aria-label="Warning Sign">⚠️ </span> WARNING: If you are deploying the dist version to [GitHub Pages](https://pages.github.com/ 'GitHub Pages'), note that the built bundle uses an absolute path to the `/dist/` directory while GitHub Pages requires the relative `./dist/` to find any embedded assets and/or images. A very hacky way to fix this is to edit one place in the produced bundle, as shown [in this GitHub issue](https://github.com/FormidableLabs/spectacle/issues/326#issue-233283633 'GitHub: spectacle issue #326')._

<a name="presenting"></a>

# Presenting

Spectacle comes with a built in presenter mode. It shows you a slide lookahead, current time and your current slide:

![http://i.imgur.com/jW8uMYY.png](http://i.imgur.com/jW8uMYY.png)

You also have the option of a stopwatch to count the elapsed time:

![http://i.imgur.com/VDltgmZ.png](http://i.imgur.com/VDltgmZ.png)

To present:

- Run `npm start`. You will be redirected to a URL containing your presentation or visit [http://localhost:3000/#/](http://localhost:3000/#/)
- Open a second browser window on a different screen
- Add `?presenter` or `?presenter&timer` immediately after the `/`, e.g.: [http://localhost:3000/#/0?presenter](http://localhost:3000/#/0?presenter) or [http://localhost:3000/#/?presenter&timer](http://localhost:3000/#/?presenter&timer)
- Give an amazingly stylish presentation

_NOTE: Any windows/tabs in the same browser that are running Spectacle will sync to one another, even if you don't want to use presentation mode_

Check it out:

![http://i.imgur.com/H7o2qHI.gif](http://i.imgur.com/H7o2qHI.gif_)

You can toggle the presenter or overview mode by pressing respectively `alt+p` and `alt+o`.

<a name="controls"></a>

# Controls

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

<a name="fullscreen"></a>

# Fullscreen

Fullscreen can be toggled via browser options, <kbd>Alt/Option</kbd> + <kbd>F</kbd>, or by pressing the button in the bottom right corner of your window.

Note: Right now, this works well when browser window itself is not full screen. When the browser is in fullscreen, there is an issue [#654](https://github.com/FormidableLabs/spectacle/issues/654). This is because we use the browser's FullScreen API methods. It still works but has some inconsistency.

<a name="pdf-export"></a>

# PDF Export

You can export a PDF from your Spectacle presentation either from the command line or browser:

### CLI

- Run `npm install spectacle-renderer -g`
- Run `npm start` on your project and wait for it to build and be available
- Run `spectacle-renderer`

A PDF is created in your project directory. For more options and configuration of this tool, check out:

[https://github.com/FormidableLabs/spectacle-renderer](https://github.com/FormidableLabs/spectacle-renderer)

### Browser

After running `npm start` and opening [http://localhost:3000/#/](http://localhost:3000/#/) in your browser...

- Add `?export` after the `/` on the URL of the page you are redirected to, e.g.: [http://localhost:3000/#/?export](http://localhost:3000/#/?export)
- Bring up the print dialog `(ctrl or cmd + p)`
- Change destination to "Save as PDF", as shown below:

![https://i.imgur.com/fLeYrZC.png](https://i.imgur.com/fLeYrZC.png)

If you want a printer friendly version, repeat the above process but instead print from [http://localhost:3000/#/?export&print](http://localhost:3000/#/?export&print).

If you want to export your slides with your [notes](#notes) included, repeat the above process but instead print from [http://localhost:3000/#/?export&notes](http://localhost:3000/#/?export&notes).

### Query Parameters

Here is a list of all valid query parameters that can be placed after `/#/` on the URL.

| Query               | Description                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 0, 1, 2, 3... etc.  | Will take you to the corresponding slide, with `0` being the first slide in the presentation.                        |
| ?export             | Creates a single-page overview of your slides, that you can then print.                                              |
| ?export&notes       | Creates a single-page overview of your slides, including any [notes](#notes), that you can then print.               |
| ?export&print       | Creates a black & white single-page overview of your slides.                                                         |
| ?export&print&notes | Creates a black & white single-page overview of your slides, including any [notes](#notes), that you can then print. |
| ?presenter          | Takes you to presenter mode where you’ll see current slide, next slide, current time, and your [notes](#notes).      |
| ?presenter&timer    | Takes you to presenter mode where you’ll see current slide, next slide, timer, and your [notes](#notes).             |
| ?overview           | Take you to overview mode where you’ll see all your slides.                                                          |

_NOTE: If you add a non-valid query parameter, you will be taken to a blank page. Removing or replacing the query parameter with a valid query parameter and refreshing the page will return you to the correct destination._
