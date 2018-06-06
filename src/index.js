import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PowerPicture extends Component {
  static propTypes = {
    source: PropTypes.string,
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        size: PropTypes.number
      })
    ),
    onError: PropTypes.func,
    children: PropTypes.func
  };

  constructor(props) {
    super(props);

    // define an internal variable for the image that will be loaded
    this.image = null;

    // define error messages
    this.ERROR_TOO_MANY_SOURCES = `PowerPicture requires ONE prop of either \'source\' or \'sources\' but cannot accept both`;
    this.ERROR_MISSING_SOURCE = `PowerPicture requires either \'source\' or \'sources\' as a prop`;

    // define the component state
    this.state = {
      image: null,
      loading: true
    };
  }

  /**
   * Start loading the right image once the component mounts
   */
  componentDidMount() {
    const { source, sources } = this.props;
    let imgToLoad;

    if (sources) {
      if (source) {
        throw new Error(this.ERROR_TOO_MANY_SOURCES);
      }
      imgToLoad = this.getIdealSize(sources, window.innerWidth);
    } else if (source) {
      imgToLoad = source;
    } else {
      throw new Error(this.ERROR_MISSING_SOURCE);
    }

    this.loadImage(imgToLoad);
  }

  /**
   * Unsubscribe any events that the image loading might have subscribed to
   */
  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  /**
   * Determine whether the image needs to be changed after a component update
   *
   * @param {Object} prevProps props of component before update
   * @param {Object} prevState state of component before update
   */
  componentDidUpdate(prevProps, prevState) {
    const { source, sources } = this.props;

    // default to source (which may be undefined)
    let imgToLoad = source;

    // get the image to load from sources (if defined)
    if (sources) {
      imgToLoad = this.getIdealSize(sources, window.innerWidth);
    }

    // If the img source changed, reset PowerPicture back to the default state
    if (prevState.image !== null && imgToLoad !== prevState.image) {
      this.setState(
        {
          image: null,
          loading: true
        },
        () => this.loadImage(imgToLoad)
      );
    }
  }

  /**
   * Return the optimal image source for the device type
   *
   * @param {Array} sources Array of objects with src path and size
   * @param {Int} windowWidth Width of the browser window
   */
  getIdealSize(sources, windowWidth) {
    const srcsBiggerThanWindow = sources.filter(src => src.size > windowWidth);
    if (srcsBiggerThanWindow.length) {
      return srcsBiggerThanWindow[0].src;
    } else {
      return sources[sources.length - 1].src;
    }
  }

  /**
   * Begin the loading of the image
   *
   * @param {String} srcPath Source path for the image to load
   */
  loadImage = srcPath => {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const image = new Image();
    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = srcPath;
  };

  /**
   * Update the component state when image loading is completed
   */
  onLoad = () => {
    this.setState({
      image: this.image.src,
      loading: false
    });
  };

  /**
   * Call prop function (if any) when an error occurs during image load
   */
  onError = errorEvent => {
    const { onError } = this.props;
    if (onError) {
      onError(errorEvent);
    }
  };

  /**
   * Expose the image and loading state to the render prop
   */
  render() {
    const { image, loading } = this.state;
    const { children } = this.props;
    if (!children || typeof children !== 'function') {
      throw new Error(`PowerPicture requires a function as its only child`);
    }
    return children(image, loading);
  }
}

export default PowerPicture;
