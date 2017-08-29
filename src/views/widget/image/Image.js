/**
 * Created by Jackoder on 2017/6/7.
 */
import React from 'react';
import {
  Image,
  Platform,
  View
} from 'react-native';
import _ from 'lodash';
var flattenStyle = require('react-native/Libraries/StyleSheet/flattenStyle');

const ImageHolder = (props) => {
  if (Platform.OS == 'ios') {
    return <Image {...props}/>
  }
  let source = transformUri(props.source, props.style);
  const defaultSource = props.defaultSource;
  if (source) {
    const realImage = <Image {...props} source={source}/>;
    if (defaultSource == null) {
      return realImage;
    } else {
      return (
        <View>
          <Image {...props} source={defaultSource} />
          <Image {...props} style={[props.style, {position: 'absolute'}]} source={source}/>
        </View>
      )
    }
  }
  return <Image {...props}/>
};

const transformUri = (source, style) => {
  let uri = _.get(source, 'uri');
  if (uri) {
    if (style && uri.match("(\\S+)://\\S+.(101|99|tianyuimg).com/[s|b]/p/\\S+")) {
      let width = flattenStyle(style).width;
      if (!isNaN(width)) {
        let type = "";
        let ed = uri.lastIndexOf(".");
        if (ed > 0) {
          type = uri.substring(ed);
        }
        let ret = uri + "!f" + (width * 2) + "x0" + type;
        return ret;
      }
      return uri;
    }
  }
  return source;
}

module.exports = ImageHolder;
