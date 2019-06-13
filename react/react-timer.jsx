import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {

  timer = null;
  delay = (func, delay) => {
    this.timer = setTimeout(func, delay)
  }

  clearDelay = () => {
    clearTimeout(this.timer)
    this.timer = null
  }

  action = () => {
    this.delay(() => {
      doThing()
    }, 1000)
  }

  render() {
    return <div />;
  }
}
