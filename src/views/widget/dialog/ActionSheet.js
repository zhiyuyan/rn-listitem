/**
 * Created by Jackoder on 2017/7/13.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import Dialog from './Dialog';
import AlertDialog from './AlertDialog';
import _ from 'lodash';
import {
  FontSize,
  StaticColor
} from '../../base';

const isIOS = Platform.OS === 'ios';
const WIDTH = Dimensions.get('window').width;

/**
 * http://cube.nd.com.cn/uikit/index.php?title=%E6%A0%87%E5%87%86%E6%8E%A7%E4%BB%B6%E5%BA%93(Mobile%E7%AB%AF):%E5%BA%95%E9%83%A8%E5%8A%A8%E4%BD%9C%E6%9D%A1
 * 1. 文本列表
 * 2. 图文列表
 * 3. 棋盘列表 TODO
 * 4. 扩展模式 TODO
 */
export default class ActionSheet extends Component {

  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.number,
    })),
    onItemClick: PropTypes.func,
    onCancel: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  show = () => {
    this.dialogRef && this.dialogRef.show();
  }

  hide = () => {
    this.dialogRef && this.dialogRef.hide();
  }

  render() {
    let children = [];
    !_.isEmpty(this.props.title) && children.push(
      <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">{this.props.title}</Text>);
    this.props.items.forEach(item => {
      isIOS && children.length > 0 && children.push(<View style={styles.divider}/>);
      children.push(this._renderItem(item, () => {
        this.props.onItemClick && this.props.onItemClick(item);
        this.hide();
      }));
    });
    return isIOS ? this._renderIOS(children) : this._renderAndroid(children);
  }

  _onCancel = () => {
    this.props.onCancel && this.props.onCancel();
    this.hide();
  }

  _renderAndroid(children) {
    return (
      <AlertDialog
        ref={this._ref} {...this.props} title={null} message={children}
        containerStyle={{paddingTop: 8, paddingBottom: 8}}
        contentStyle={{marginLeft: 0, marginRight: 0, marginBottom: 0}}
        buttonPositive='取消' onPositive={this._onCancel}/>
    );
  }

  _renderIOS(children) {
    children.push(<View style={{height: 6, backgroundColor: StaticColor.COLOR10}}/>);
    children.push(this._renderItem({title: '取消'}, this._onCancel));
    const contentView = (
      <View style={styles.container}>
        {children}
      </View>
    );
    return (
      <Dialog
        ref={this._ref}  {...this.props} contentView={contentView}
        backgroundStyle={{justifyContent: 'flex-end'}}/>
    );
  }

  _ref = ref => this.dialogRef = ref;

  _renderItem(item, callback) {
    let children = [];
    item.icon > 0 && children.push(<Image style={styles.icon} source={item.icon}/>);
    !_.isEmpty(item.title) && children.push(
      <Text style={styles.text} singleLine={true} ellipsizeMode='tail'>{item.title}</Text>);
    return (
      <TouchableHighlight
        onPress={callback}
        underlayColor={StaticColor.COLOR8}>
        <View style={[styles.itemContainer, children.length >= 2 ? {justifyContent: 'flex-start'} : null]}>
          {children}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: WIDTH
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 5,
    marginLeft: isIOS ? 10 : 0
  },
  title: {
    fontSize: FontSize.CHARACTER5,
    color: StaticColor.COLOR4,
    backgroundColor: StaticColor.COLOR7,
  },
  itemContainer: {
    height: 44,
    backgroundColor: StaticColor.COLOR7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: isIOS ? 'center' : 'flex-start'
  },
  text: {
    fontSize: isIOS ? FontSize.CHARACTER4 : FontSize.CHARACTER13,
    color: StaticColor.COLOR1
  },
  divider: {
    height: 0.5,
    backgroundColor: StaticColor.COLOR8
  }
});
