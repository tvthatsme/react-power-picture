# Contributing

Thanks for being willing to contribute!

## Project Setup

First of all fork and clone the repo :smile:

Next run these commands in two terminal tabs:

```console
# run example to start developing your new component against
npm link # the link commands are important for local development
npm install # disregard any warnings about missing peer dependencies
npm start # runs rollup with watch flag

# (in another tab, run the example create-react-app)
cd example
npm link react-power-picture
npm install
npm start # runs create-react-app hot-reload dev server
```

Once you've run these commands, anytime you make a change to React-Power-Picture in src/ or to the example application's example/src, create-react-app will live-reload your local dev server so you can iterate in real-time.
