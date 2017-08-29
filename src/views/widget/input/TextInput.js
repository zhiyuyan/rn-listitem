/**
 * Created by Jackoder on 2017/6/20.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import _ from 'lodash';
import {
  FontSize,
  StaticColor
} from '../../base';

export default class TextInputBeta extends Component {

  static propTypes = {
    ...TextInput.propTypes,
    onClearPress: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.clearTextOnFocus = props.clearTextOnFocus;
    this.text = _.get(props, 'defaultValue');
  }

  render() {
    const value = (
      <TextInput
        autoFocus={false}
        selectionColor={StaticColor.COLOR14}
        placeholderTextColor={StaticColor.COLOR4}
        underlineColorAndroid={'transparent'}
        {...this.props}
        clearTextOnFocus={false} //this.clearTextOnFocus 来控制
        ref={'input'}
        style={[styles.value, this.clearTextOnFocus && !_.isEmpty(this.text) ? styles.valueWithClear : null]}
        onChangeText={this._onChangeText}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        defaultValue={this.text}
      />
    );
    const clearButton = (
      <TouchableOpacity style={styles.clearContainer}
        onPress={this._clear}>
        <Image style={styles.clear} source={Platform.OS === 'ios' ?
          require('../../../../res/clear.png') : require('../../../../res/clear_and.png')}/>
      </TouchableOpacity>
    );
    const showClearButton = this.clearTextOnFocus && !_.isEmpty(this.text);
    return (
      <View
        style={[styles.container, this.props.style]}>
        {value}
        {showClearButton ? clearButton : null}
      </View>
    );
  }

  _clear = () => {
    this.refs.input.clear();
    this._onChangeText(null);
    // this.refs.input.blur();
    this.props.onClearPress && this.props.onClearPress();
  }

  _onChangeText = text => {
    if (_.isEmpty(this.text) && !_.isEmpty(text) || _.isEmpty(text) && !_.isEmpty(this.text)) {
      this.text = text;
      this.forceUpdate();
    } else {
      this.text = text;
    }
    this.props.onChangeText && this.props.onChangeText(text);
  }

  _onFocus = () => {
    this.props.onFocus && this.props.onFocus();
  }

  _onBlur = () => {
    this.props.onBlur && this.props.onBlur();
  }

  isFocused = () => this.refs.input.isFocused();

  clear = () => this.refs.input.clear();

  blur = () => this.refs.input.blur();

  focus = () => this.refs.input.focus();
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    padding: 0,
    flex: 1,
    fontSize: FontSize.CHARACTER13,
    color: StaticColor.COLOR1,
    height: 44,
  },
  valueWithClear: {
    paddingRight: 36
  },
  clear: {
    width: 16,
    height: 16
  },
  clearContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    right: 0
  }
});