/**
 * Created by Jackoder on 2017/6/18.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import _ from 'lodash';
import {
  FontSize,
  StaticColor
} from '../../base';
import TextInput from './TextInput';

export default class ItemInput extends Component {

  static propTypes = {
    ...ViewPropTypes,
    inputProps: PropTypes.shape({
      ...TextInput.propTypes
    }),
    label: PropTypes.string,
    labelIcon: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.element
    ]),
    rightType: PropTypes.oneOf([
      'none', 'clear', 'delete'
    ]),
    onRightPress: PropTypes.func,
  }

  static defaultProps = {
    inputProps: {},
    valueTip: '请输入',
    rightType: 'clear',
    editable: true,
    placeholderTextColor: StaticColor.COLOR4,
  }

  constructor(props) {
    super(props);
    this.onRightPress = this._onRightPress.bind(this);
    this.onChangeText = this._onChangeText.bind(this);
    this.onFocus = this._onFocus.bind(this);
    this.onBlur = this._onBlur.bind(this);
    this.text = _.get(props, 'inputProps.defaultValue', '');
  }

  render() {
    const value = (
      <TextInput
        ref={'input'}
        {...this.props.inputProps}
        style={[styles.value, this.props.inputProps.style, this.props.rightType === 'delete' ? styles.valueWithClear : null]}
        clearTextOnFocus={this.props.rightType === 'clear'}
        editable={this.props.rightType != 'delete' && this.props.inputProps.editable}
        onChangeText={this.onChangeText}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        defaultValue={this.text}
        numberOfLines={1}
      />
    );
    const deleteButton = (
      <TouchableOpacity
        style={styles.clearContainer}
        onPress={this.onRightPress}>
        <Image style={styles.clear} source={require('../../../../res/delete.png')}/>
      </TouchableOpacity>
    );
    const showDeleteButton = this.props.rightType == 'delete';
    const content = (
      <View style={[styles.container, this.props.style]}>
        {
          this.props.label == null ? null : (this.props.labelIcon == null ? <Text style={[styles.labelContainer, styles.label]}>{this.props.label}</Text> : (
            <View style={styles.labelContainer}>
              {
                typeof(this.props.labelIcon) == 'element' ? this.props.labelIcon :
                  <Image style={styles.labelIcon} source={this.props.labelIcon}/>
              }
              <Text style={styles.label}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>{this.props.label}</Text>
            </View>
          ))
        }
        {
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {value}
            {showDeleteButton ? deleteButton : null}
          </View>
        }
      </View>
    );
    if (this.props.clickable) {
      return <TouchableOpacity onPress={this.onClick}>{content}</TouchableOpacity>
    } else {
      return content;
    }
  }

  _onRightPress = () => {
    if (this.props.rightType == 'clear') {
      this.refs.input.clear();
    }
    this.props.onRightPress && this.props.onRightPress();
  }

  _onChangeText = text => {
    this.text = text;
    if (!_.isEmpty(text)) {
      this.forceUpdate();
    }
    this.props.inputProps.onChangeText && this.props.inputProps.onChangeText(text);
  }

  _onFocus = () => {
    this.forceUpdate();
    this.props.inputProps.onFocus && this.props.inputProps.onFocus();
  }

  _onBlur = () => {
    this.forceUpdate();
    this.props.inputProps.onBlur && this.props.inputProps.onBlur();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 122,
    paddingRight: 10
  },
  labelIcon: {
    width: 14,
    height: 14,
    marginRight: 8
  },
  label: {
    fontSize: FontSize.CHARACTER13,
    color: StaticColor.COLOR4
  },
  value: {
    flex: 1,
    fontSize: FontSize.CHARACTER13,
    color: StaticColor.COLOR1,
  },
  valueWithClear: {
    paddingRight: 36,
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
