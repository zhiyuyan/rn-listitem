/**
 * 数据为空页面
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import StaticContainer from 'react-static-container';

export default class EmptyComponent extends Component {

  render = () => (
    <StaticContainer>
      <View style={styles.container}>
        <Image source={require('../../../../res/ele_empty_icon.png')} style={styles.emptyIcon}/>
        <Text style={styles.hintFirst}>
          没有数据
        </Text>
        <Text style={styles.hintSecond}>
          偷懒君未添加相关内容哦!
        </Text>
      </View>
    </StaticContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyIcon: {
    width: 128,
    height: 128
  },
  hintFirst: {
    fontSize: 14,
    marginTop: 10,
  },
  hintSecond: {
    fontSize: 12,
    marginTop: 10,
    color: '#838383'
  }
});
