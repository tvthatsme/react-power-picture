import React, { Component } from 'react';
import PowerPicture from 'react-power-picture';

export default class App extends Component {
  render() {
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
    return (
      <div>
        <h1 className="header">React Power Picture Example</h1>
        <div className="center">
          <PowerPicture sources={sources}>
            {(image, loading) => (
              <div className="text-center">
                <p>Loading state: {loading.toString()}</p>
                <img alt="A p!cture is worth a thousand words" src={image} />
              </div>
            )}
          </PowerPicture>
        </div>
      </div>
    );
  }
}
