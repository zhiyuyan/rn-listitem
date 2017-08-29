/**
 * 加载失败
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Button from 'apsl-react-native-button';
import StaticContainer from 'react-static-container';

const loadFailIcon = require('../../../../res/icon_404.png')

export default class LoadFailComponent extends Component {

  static propTypes = {
    retryRequest: PropTypes.func
  }

  render() {
    return (
      <StaticContainer>
        <View style={styles.container}>
          <Image style={styles.loadFailIcon} source={loadFailIcon}/>
          <Text style={styles.hintFirst}>
            网络出现故障
          </Text>
          <Text style={styles.hintSecond}>
            请上传日志帮助我们进一步分析问题
          </Text>
          <Button style={styles.retryButton} textStyle={styles.textStyle}
                  onPress={this.props.retryRequest}>
            重试
          </Button>
        </View>
      </StaticContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  loadFailIcon: {
    width: 134,
    height: 130
  },
  hintFirst: {
    fontSize: 14,
    marginTop: 10,
  },
  hintSecond: {
    fontSize: 12,
    marginTop: 10,
    color: '#838383'
  },
  retryButton: {
    marginTop: 40,
    marginLeft: 100,
    marginRight: 100,
    alignItems: 'center',
    borderColor: '#37aeff',
    backgroundColor: '#37aeff'
  },
  textStyle: {
    color: 'white'
  },
});
