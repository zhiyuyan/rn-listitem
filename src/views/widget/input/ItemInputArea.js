'use strict';

import React, {PropTypes} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ViewPropTypes,
  ColorPropType
} from 'react-native';
import {
  FontSize,
  StaticColor
} from '../../base';
const flattenStyle = require('react-native/Libraries/StyleSheet/flattenStyle');
import _ from 'lodash';

export default class ItemInputArea extends React.Component {

  static propTypes = {
    ...TextInput.propTypes,
    countHintMode: PropTypes.oneOf(['none', 'current', 'remain'])
  }

  static defaultProps = {
    multiline: true,
    placeholderTextColor: StaticColor.COLOR4,
    countHintMode: 'none'
  }

  constructor(props) {
    super(props);
    this.onChangeText = this._onChangeText.bind(this);
    this.state = {
      text: _.get(props, 'value', '')
    };
  }

  render() {
    // const style = flattenStyle(this.props.style);
    // const height = style && style.height != 0 ? style.height - style.paddingTop - 38 : 0;
    // const heightStyle = height > 0 ? {height} : null;
    let countHint;
    if (this.props.maxLength > 0 && this.props.countHintMode == 'remain') {
      countHint = <Text style={styles.countHint}>{this.state.text.trim().length + '/' + this.props.maxLength}</Text>;
    } else if (this.props.countHintMode == 'current') {
      countHint = <Text style={styles.countHint}>{this.state.text.trim().length}</Text>;
    } else {
      countHint = null;
    }
    return (
      <View style={[this.props.style, styles.container]}>
        <TextInput
          autoFocus={false}
          selectionColor={StaticColor.COLOR14}
          placeholderTextColor={StaticColor.COLOR4}
          underlineColorAndroid={'transparent'}
          {...this.props}
          style={[styles.textArea, countHint == null ? null : styles.textAreaWithCountHint]}
          selectionColor={StaticColor.COLOR14}
          onChangeText={this.onChangeText}
          value={this.state.text}
        />
        {countHint}
      </View>
    );
  }

  _onChangeText = text => {
    this.setState({text});
    this.props.onChangeText && this.props.onChangeText(text);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StaticColor.COLOR7
  },
  textArea: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: StaticColor.COLOR1,
    fontSize: FontSize.CHARACTER13,
    textAlignVertical: 'top'
  },
  textAreaWithCountHint: {
    paddingBottom: 40,
  },
  countHint: {
    color: StaticColor.COLOR4,
    fontSize: FontSize.CHARACTER5,
    marginBottom: 10,
    position: 'absolute',
    right: 10,
    bottom: 15,
  }
});