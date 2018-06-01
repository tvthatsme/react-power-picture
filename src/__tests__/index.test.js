import React from 'react';
import renderer from 'react-test-renderer';
import PowerPicture from '../index';

const defaultSrcs = [
  {
    size: 20,
    src: 'https://source.unsplash.com/random/20x10'
  }
];

describe('PowerPicture Component', () => {
  it('Renders a snapshot that is good', () => {
    const comp = renderer
      .create(
        <PowerPicture sources={defaultSrcs}>
          {image => (
            <div className="text-center">
              <img alt="description" src={image} />
            </div>
          )}
        </PowerPicture>
      )
      .toJSON();

    expect(comp).toMatchSnapshot();
  });

  it('Starts with loading equals true', () => {
    let result = null;
    const comp = renderer.create(
      <PowerPicture sources={defaultSrcs}>
        {(image, loading) => {
          if (result === null) {
            result = loading;
          }
          return null;
        }}
      </PowerPicture>
    );

    expect(result).toBe(true);
  });

  it('Throws if not provided a function as a child', () => {
    const _error = console.error;
    console.error = jest.fn(() => {});
    try {
      expect(() => {
        renderer.create(
          <PowerPicture sources={defaultSrcs}>
            <p>Not a render method</p>
          </PowerPicture>
        );
      }).toThrow(`PowerPicture requires a function as its only child`);
    } finally {
      console.error = _error;
    }
  });

  it('Throws if not provided any sources', () => {
    const _error = console.error;
    console.error = jest.fn(() => {});
    try {
      expect(() => {
        renderer.create(
          <PowerPicture>
            {image => (
              <div className="text-center">
                <img alt="description" src={image} />
              </div>
            )}
          </PowerPicture>
        );
      }).toThrow(`PowerPicture requires sources as a prop`);
    } finally {
      console.error = _error;
    }
  });

  it('Loads the optimal image for the screen size', () => {
    const screenSrcs = [
      {
        size: 20,
        src: 'https://source.unsplash.com/random/20x10'
      },
      {
        size: 40,
        src: 'https://source.unsplash.com/random/40x10'
      },
      {
        size: 60,
        src: 'https://source.unsplash.com/random/60x10'
      }
    ];
    let result = null;

    // Change the viewport to 19px.
    global.innerWidth = 19;

    const smallScreen = renderer.create(
      <PowerPicture sources={screenSrcs}>
        {image => {
          result = image;
          return null;
        }}
      </PowerPicture>
    );

    expect(result).toBe(screenSrcs[0].src);

    // Change the viewport to 20px.
    global.innerWidth = 20;

    const mediumScreen = renderer.create(
      <PowerPicture sources={screenSrcs}>
        {image => {
          result = image;
          return null;
        }}
      </PowerPicture>
    );

    expect(result).toBe(screenSrcs[1].src);

    // Change the viewport to 80px.
    global.innerWidth = 80;

    const largeScreen = renderer.create(
      <PowerPicture sources={screenSrcs}>
        {image => {
          result = image;
          return null;
        }}
      </PowerPicture>
    );

    expect(result).toBe(screenSrcs[2].src);
  });
});
