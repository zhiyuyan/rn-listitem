/**
 * Created by Jackoder on 2017/6/20.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewPropTypes,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import TextInput from '../input/TextInput';
import {
  FontSize,
  StaticColor
} from '../../base';
import _ from 'lodash';
import NdModules from '@sdp.nd/react-appfactory-wrapper';

const isIOS = Platform.OS === 'ios';
const WIDTH = Dimensions.get('window').width;

export default class SearchInputView extends Component {

  static propTypes = {
    style: ViewPropTypes.style,
    icon: PropTypes.number,
    onCancel: PropTypes.func,

    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
    defaultValue: PropTypes.string,
  }

  static defaultProps = {
    icon: require('../../../../res/search.png'),
    placeholder: '搜索',
  }

  render = () => {
    const input = (
      <TextInput style={[styles.text, isIOS ? {flex: 1} : null]}
                 ref={'input'}
                 placeholder={this.props.placeholder}
                 placeholderTextColor={StaticColor.COLOR5}
                 defaultValue={this.props.defaultValue}
                 onChangeText={this.props.onChangeText}
                 clearTextOnFocus={true}/>
    );
    if (Platform.OS === 'ios') {
      return (
        <View style={[styles.container, {width: WIDTH}, this.props.style]}>
          <View style={styles.innerContainer}>
            <Image style={styles.icon} source={this.props.icon}/>
            {input}
          </View>
          <TouchableOpacity onPress={this._cancel}>
            <Text style={styles.textButton}>取消</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[styles.container, this.props.style]}>
          {input}
        </View>
      );
    }
  };

  _cancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    } else {
      if (!_.get(this.props, 'navigation.state.key', 'Init').startsWith('Init')) {
        this.props.navigation.goBack();
      } else {
        NdModules.NdInstances.sdp_appfactory.finishCurrentPage({});
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: StaticColor.COLOR10,
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: StaticColor.COLOR9
  },
  innerContainer: {
    flex: 1,
    height: 30,
    backgroundColor: StaticColor.COLOR7,
    borderColor: StaticColor.COLOR5,
    borderWidth: 0.5,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    width: 14,
    height: 14,
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    fontSize: FontSize.CHARACTER4,
    color: StaticColor.COLOR1,
  },
  textButton: {
    fontSize: FontSize.CHARACTER4,
    color: StaticColor.COLOR14,
    margin: 10
  }
});
