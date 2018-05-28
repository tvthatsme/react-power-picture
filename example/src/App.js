import React, { Component } from 'react';

import PowerPicture from 'react-power-picture';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="header">React Power Picture Example</h1>
        <div className="center">
          <PowerPicture />
        </div>
      </div>
    );
  }
}
