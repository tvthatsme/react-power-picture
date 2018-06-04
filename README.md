# React Power Picture

[![Build Status](https://travis-ci.org/tvthatsme/react-power-picture.svg?branch=master)](https://travis-ci.org/tvthatsme/react-power-picture)
[![Coverage Status](https://coveralls.io/repos/github/tvthatsme/react-power-picture/badge.svg?branch=master)](https://coveralls.io/github/tvthatsme/react-power-picture?branch=master)
[![npm version](https://badge.fury.io/js/react-power-picture.svg)](https://badge.fury.io/js/react-power-picture)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Render images in your React application that take advantage of progressive loading as well as responsive sizing. Serviced by a render prop for excellent integration with all your projects.

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `dependencies`:

```
npm install --save react-power-picture
```

> This package also depends on `react` and `prop-types`. Please make sure you
> have those installed as well.

## Usage

[![Edit v06l97zxyy](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/v06l97zxyy)

```jsx
import React from 'react';
import { render } from 'react-dom';
import PowerPicture from 'react-power-picture';

const sources = [
  {
    size: 400,
    src: 'https://source.unsplash.com/random/200x140'
  },
  {
    size: 800,
    src: 'https://source.unsplash.com/random/300x200'
  },
  {
    size: 1200,
    src: 'https://source.unsplash.com/random/400x300'
  }
];

render(
  <PowerPicture sources={sources}>
    {(image, loading) => (
      <div>
        <p>Loading state: {loading.toString()}</p>
        <img alt="A p!cture is worth a thousand words" src={image} />
      </div>
    )}
  </PowerPicture>,
  document.getElementById('root')
);
```

<PowerPicture /> is the only component. It doesn't render anything itself, it just calls the render function and renders that. Use this to create anything you'd like to!

## Props

### sources

An array of objects, each one with a `size` and `src` key, value pair. React Power Picture uses this source map and the windows width to determine the optimal image to load given the number of object that the prop provides.

### onError (optional)

Optional callback method that is triggered if there is an error loading the image.

## Examples

A live example of this in action can be found on the [project's GitHub page](https://tvthatsme.github.io/react-power-picture).

## Inspiration

This project has been heavily inspired by the work of Formidable Labs and their [react-progressive-image](https://github.com/FormidableLabs/react-progressive-image) library. It does many things exactly right but did not provide the responsive solution that I was originally looking for.

Another shoutout to the [react-simple-image](https://github.com/bitjourney/react-simple-image) library. This project has everything for responsive images loaded as a `srcset` but with much broader prop support and less render flexibiliy.

You might consider React Power Picture to be a marriage of the two. My goal for this library to provide both progressive and responsive power.

## License

MIT
