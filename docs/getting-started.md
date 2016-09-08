<a name="getting-started"></a>
# Getting Started

The best way to get started is by using the [Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate).

Alternatively, you can `npm install spectacle` and write your own build configurations.

But really, it is SO much easier to just use the boilerplate. Trust me.

<a name="development"></a>
## Development

After downloading the boilerplate, your first order of business is to open terminal and run `npm install`

Next run `rm -R .git` to remove the existing version control.

Then, to start up the local server, run `npm start`

Open a browser and hit [http://localhost:3000](http://localhost:3000), and we are ready to roll

<a name="build--deployment"></a>
## Build & Deployment

Building the dist version of the project is as easy as running `npm run build`

If you want to deploy the slideshow to surge, run `npm run deploy`

<a name="presenting"></a>
## Presenting

Spectacle comes with a built in presenter mode. It shows you a slide lookahead, current time and your current slide:

![http://i.imgur.com/csPXbjM.png](http://i.imgur.com/csPXbjM.png)

To present:

- Run `npm start`
- Open two browser windows on two different screens
- On your screen visit [http://localhost:3000/?presenter](http://localhost:3000/?presenter)
- On the presentation screen visit [http://localhost:3000/](http://localhost:3000/)
- Give an amazingly stylish presentation

_Note: Any windows/tabs in the same browser that are running Spectacle will sync to one another, even if you don't want to use presentation mode_

Check it out:

![http://i.imgur.com/H7o2qHI.gif](http://i.imgur.com/H7o2qHI.gif_)

You can toggle the presenter or overview mode by pressing respectively `alt+p` and `alt+o`.

<a name="controls"></a>
## Controls

|Key Combination|Function|
|---|---|
|Right Arrow|Next Slide|
|Left Arrow|Previous Slide|
|Space|Next Slide|
|Shift+Space|Previous Slide|
|Alt/Option + O|Toggle Overview Mode|
|Alt/Option + P|Toggle Presenter Mode|

<a name="fullscreen"></a>
## Fullscreen

Fullscreen can be toggled via browser options, or by **hovering over the bottom right corner of your window until the fullscreen icon appears and clicking it**.

<a name="pdf-export"></a>
## PDF Export

Exporting a totally sweet looking PDF from your totally sweet looking Spectacle presentation is absurdly easy.

- Run `npm start`
- Append your URL with `?export` ([http://localhost:3000/?export](http://localhost:3000/?export))
- Bring up the print dialog `(ctrl or cmd + p)`
- Check "Background Graphics" to on if you are about that life
- Change destination to "Save as PDF", as shown below:

![http://i.imgur.com/t6GL5Oc.png](http://i.imgur.com/t6GL5Oc.png)

If you want to print your slides, and want a printer friendly version, simply repeat the above process but instead print from [http://localhost:3000/?export&print](http://localhost:3000/?export&print)