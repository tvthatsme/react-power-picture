import React, { Component } from 'react';
import PowerPicture from 'react-power-picture';
import ToggleButton from './ToggleButton';

export default class App extends Component {
  state = {
    useSrcMap: true
  };

  sources = [
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

  useSrcMap = toggle => {
    this.setState({
      useSrcMap: toggle
    });
  };

  renderPicture = (image, loading) => {
    return (
      <div className="text-center">
        <p>Loading state is tracked: {loading.toString()}</p>
        <img alt="A p!cture is worth a thousand words" src={image} />
      </div>
    );
  };

  useSources = () => {
    return (
      <PowerPicture sources={this.sources}>
        {(image, loading) => this.renderPicture(image, loading)}
      </PowerPicture>
    );
  };

  useSource = () => {
    return (
      <PowerPicture source={this.sources[2].src}>
        {(image, loading) => this.renderPicture(image, loading)}
      </PowerPicture>
    );
  };

  render() {
    const picture = this.state.useSrcMap ? this.useSources() : this.useSource();
    return (
      <div>
        <h1 className="header">React Power Picture Example</h1>
        <p className="text-center">
          Source info can come from an array of srcset info or from a single url
        </p>
        <div className="toggle-container">
          <ToggleButton
            select={() => this.useSrcMap(true)}
            selected={this.state.useSrcMap}
            text="Use Source Map"
          />
          <ToggleButton
            select={() => this.useSrcMap(false)}
            selected={!this.state.useSrcMap}
            text="Use Single Source"
          />
        </div>
        <div className="center">{picture}</div>
      </div>
    );
  }
}
