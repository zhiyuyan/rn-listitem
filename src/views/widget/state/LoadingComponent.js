/**
 * 加载页面
 */
'use strict';

import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import StaticContainer from 'react-static-container';

export default class LoadingComponent extends Component {

  render() {
    return (
      <StaticContainer>
        <View style={styles.container}>
          <ActivityIndicator
            color={'#3298fd'}
            indeterminate
          />
          <Text style={styles.hint}>
            正在加载中，请稍后...
          </Text>
        </View>
      </StaticContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  hint: {
    marginTop: 10,
  }
});
