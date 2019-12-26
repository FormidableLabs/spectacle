<a name="getting-started"></a>

# Getting Started

[Setup](#setup)

[Development](#development)

[Build and Deployment](#build-and-deployment)

[Presenting](#presenting)

[Controls](#controls)

[Fullscreen](#fullscreen)

[PDF Export](#pdf-export)

[Query Parameters](#query-parameters)

<a name="setup"></a>

## Setup

First, decide whether you want to use [classic Spectacle](#classic-spectacle), [Spectacle MDX](#spectacle-mdx), which has all the same functionality but allows you to write your Spectacle presentation in markdown, or using only [one HTML page](#one-page).

<a name="classic-spectacle"></a>

### Classic Spectacle

There are four ways to get started building your presentation using the classic JSX Spectacle syntax.

1.  **Option #1:** Run the following command in your terminal:

    `npx create-react-app my-presentation --scripts-version spectacle-scripts`

2.  **Option #2:** Using the [Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate).

3.  **Option #3:** Following along the [Spectacle Tutorial](./docs/tutorial.md), which also involves downloading the [Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate).

All three of the above ways will give you everything you'll need to get started, including a sample presentation in the `presentation` folder. You can change the props and tags as needed for your presentation or delete everything in `presentation/index.js` to start from scratch. From here you can go to [Development](#development) to get started.

3.  **Option #4:** Run `npm install spectacle` in your terminal and writing your own build configurations. We also provide full UMD builds (with a `Spectacle` global variable) of the library at `dist/spectacle.js` and `dist/spectacle.min.js` for more general use cases. You could, for example, include the library via a script tag with: `https://unpkg.com/spectacle@VERSION/dist/spectacle.min.js`.

<a name="spectacle-mdx"></a>

### Spectacle MDX

Download the [Spectacle MDX Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate-mdx).

This repository will give you everything you'll need to get started, including a sample presentation in the `presentation` folder. You can change the props and tags as needed for your presentation or delete everything in the `index.mdx` file to start from scratch. From here you can go to [Development](#development) to get started.

_NOTE: We have webpack externals for `react`, `react-dom`, and `prop-types`, so you will need to provide them in your upstream build or something like linking in via `script` tags in your HTML page for all three libraries. This comports with our project dependencies which place these three libraries in `peerDependencies`._

<a name="one-page"></a>

### One Page

To aid with speedy development we've provided a simple boilerplate HTML page with a bespoke script tag that contains your entire presentation. The rest of the setup will take care of transpiling your React/ESnext code, providing Spectacle, React, and ReactDOM libraries, and being raring to go with a minimum of effort.

We can start with this project's sample at [`one-page.html`](./one-page.html). It's the same presentation as the fully-built-from-source version, with a few notable exceptions:

1.  There are no `import`s or `require`s. Everything must come from the global namespace. This includes `Spectacle`, `React`, `ReactDOM` and all the Spectacle exports from [`./src/index.js`](./src/index.js) -- `Deck`, `Slide`, `themes`, etc.

2.  The presentation must include exactly **one** script tag with the type `text/spectacle` that is a function. Presently, that function is directly inserted inline into a wrapper code boilerplate as a React Component `render` function. The wrapper is transpiled. There should not be any extraneous content around it like outer variables or comments.

    **Good** examples:

    ```html
    <script type="text/spectacle">
      () => (
        <Deck>{/* SLIDES */}</Deck>
      )
    </script>
    ```

    ```html
    <script type="text/spectacle">
      () => {
        // Code-y code stuff in JS...

        return (
          <Deck>{/* SLIDES */}</Deck>
        );
      }
    </script>
    ```

    **Bad** examples of what not to do:

    ```html
    <script type="text/spectacle">
      // Outer comment (BAD)
      const outerVariable = "BAD";

      () => (
        <Deck>{/* SLIDES */}</Deck>
      )
    </script>
    ```

3.  If you want to create your own theme settings, you can use the following code snippet to change the [themes](./docs/basic-concepts#createthemecolors-fonts) default settings.

    ```html
    <script type="text/spectacle">
      () => {
        const { themes: { defaultTheme } } = Spectacle;
        const theme = defaultTheme({
          // Change default settings
          primary: "blue",
          secondary: "red"
        },
        {
          primary: "Helvetica",
        });

        return (
          <Deck transition={['zoom']} theme={theme}>
            <Slide>some stuff</Slide>
            <Slide>other stuff</Slide>
            <Slide>some more stuff</Slide>
          </Deck>
        );
      }
    </script>
    ```

... with those guidelines in mind, here's the boilerplate that you can copy-and-paste into an HTML file and start a Spectacle presentation that works from the get go!

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width initial-scale=1 user-scalable=no"
    />
    <title>Spectacle</title>
    <link
      href="https://fonts.googleapis.com/css?family=Lobster+Two:400,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://unpkg.com/normalize.css@7/normalize.css"
      rel="stylesheet"
      type="text/css"
    />
  </head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/prop-types@15/prop-types.js"></script>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
    <script src="https://unpkg.com/spectacle@^5/dist/spectacle.js"></script>
    <script src="https://unpkg.com/spectacle@^5/lib/one-page.js"></script>
    <script type="text/spectacle">
      () => {
        // Your JS Code goes here

        return (
          <Deck>
          {/* Throw in some slides here! */}
          </Deck>
        );
      }
    </script>
  </body>
</html>
```

<a name="development"></a>

## Development

After downloading the boilerplate, run the following commands on the project's root directory...

- `npm install` (you can also use `yarn`)
- `rm -R .git` to remove the existing version control
- `npm start` to start up the local server or visit [http://localhost:3000/#/](http://localhost:3000/#/)

... and we are ready to roll

<a name="build-and-deployment"></a>

## Build and Deployment

Building the dist version of the slides is as easy as running `npm run build:dist`

If you want to deploy the slideshow to [surge](https://surge.sh/), run `npm run deploy`

_<span role="img" aria-label="Warning Sign">⚠️ </span> WARNING: If you are deploying the dist version to [GitHub Pages](https://pages.github.com/ 'GitHub Pages'), note that the built bundle uses an absolute path to the `/dist/` directory while GitHub Pages requires the relative `./dist/` to find any embedded assets and/or images. A very hacky way to fix this is to edit one place in the produced bundle, as shown [in this GitHub issue](https://github.com/FormidableLabs/spectacle/issues/326#issue-233283633 'GitHub: spectacle issue #326')._

<a name="presenting"></a>

## Presenting

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

<a name="fullscreen"></a>

## Fullscreen

Fullscreen can be toggled via browser options, <kbd>Alt/Option</kbd> + <kbd>F</kbd>, or by pressing the button in the bottom right corner of your window.

Note: Right now, this works well when browser window itself is not full screen. When the browser is in fullscreen, there is an issue [#654](https://github.com/FormidableLabs/spectacle/issues/654). This is because we use the browser's FullScreen API methods. It still works but has some inconstiency (if you reveal the browser window, it will again work as expected).

<a name="pdf-export"></a>

## PDF Export

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

## Query Parameters

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
