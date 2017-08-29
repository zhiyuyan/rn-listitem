/**
 * Created by Jackoder on 2017/6/20.
 */
import React from 'react';
import Image from './Image';
var flattenStyle = require('react-native/Libraries/StyleSheet/flattenStyle');

const Avatar = (props) => {
  if (props.style) {
    let width = flattenStyle(props.style).width;
    let height = flattenStyle(props.style).height;
    let diameter = 0;
    if (width) {
      if (height) {
        diameter = Math.min(width, height);
      } else {
        diameter = width;
      }
    } else {
      diameter = height;
    }
    return (
      <Image
        {...props}
        style={[props.style, {
        width: diameter,
        height: diameter,
        borderRadius: diameter / 2
      }]}/>
    );
  } else {
    return <Image {...props}/>
  }
}

module.exports = Avatar;