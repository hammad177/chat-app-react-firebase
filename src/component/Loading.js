/** @format */

import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div id='loading-container'>
        <div id='ball-1' className='circle'></div>
        <div id='ball-2' className='circle'></div>
        <div id='ball-3' className='circle'></div>
      </div>
    );
  }
}
