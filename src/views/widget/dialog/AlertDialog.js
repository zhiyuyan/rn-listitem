/**
 * Created by Jackoder on 2017/7/12.
 */
import React, {PropTypes, Component} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewPropTypes,
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import {
  FontSize,
  StaticColor
} from '../../base';
import _ from 'lodash';
import StaticContainer from 'react-static-container';
import Dialog from './Dialog';

const isIOS = Platform.OS === 'ios';
const HEIGHT = Dimensions.get('window').height;

/**
 * http://cube.nd.com.cn/uikit/index.php?title=%E6%A0%87%E5%87%86%E6%8E%A7%E4%BB%B6%E5%BA%93(Mobile%E7%AB%AF):%E5%BC%B9%E7%AA%97
 * 1. 全内容弹窗 TODO 顶部图片
 * 2. 带标题弹窗
 * 3. 无标题弹窗
 * 4. 特异性弹窗 TODO
 */
export default class AlertDialog extends Component {

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    buttonPositive: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onPositive: PropTypes.func,
    buttonNegative: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onNegative: PropTypes.func,
    buttonNeutral: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onNeutral: PropTypes.func,

    containerStyle: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style
  };

  static defaultProps = {
    buttonPositive: '确定'
  };

  constructor(props) {
    super(props);
    this.dialogRef = null;
  }

  shouldComponentUpdate(nextProps, newState) {
    if (_.isEqual(this.props, nextProps) && _.isEqual(this.state, newState)) {
      return false;
    }
    return true;
  }

  show = () => {
    this.dialogRef && this.dialogRef.show();
  }

  hide = () => {
    this.dialogRef && this.dialogRef.hide();
  }

  render() {
    const content = (
      <View style={[styles.container, this.props.containerStyle]}>
        {this._renderTitle()}
        {this._renderMessage()}
        {this._renderButtons()}
      </View>
    );
    return (
      <Dialog ref={this._ref} {...this.props} contentView={content}/>
    );
  }

  _ref = ref => this.dialogRef = ref;

  _renderTitle = () => this._renderText(this.props.title, styles.title,
    {
      singleLine: true,
      ellipsizeMode: 'tail'
    }
  );

  _renderMessage = () => (
    <ScrollView
      style={[{maxHeight: HEIGHT * 0.5}, styles.contentStyle, this.props.contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {this._renderText(this.props.message, styles.message)}
    </ScrollView>
  );

  _renderText(text, style, props) {
    if (typeof text === 'string') {
      return <Text style={style} {...props}>{text}</Text>;
    } else {
      return text;
    }
  }

  _renderButtons() {
    return isIOS ? this._renderButtonsIOS() : this._renderButtonsAndroid();
  }

  _renderButtonsAndroid() {
    let buttons = [
      this._renderButtonAndroid(this.props.buttonNegative, this.props.onNegative ? this.props.onNegative : this.hide),
      this._renderButtonAndroid(this.props.buttonPositive, this.props.onPositive ? this.props.onPositive : this.hide)
    ];
    if (_.isEmpty(this.props.buttonNeutral)) {
      return (
        <View style={[styles.buttonsAndroid, {justifyContent: 'flex-end'}]}>
          {buttons}
        </View>
      );
    } else {
      return (
        <View style={[styles.buttonsAndroid, {justifyContent: 'space-between'}]}>
          {this._renderButtonAndroid(this.props.buttonNeutral, this.props.onNeutral ? this.props.onNegative : this.hide)}
          <View style={{flexDirection: 'row'}}>
            {buttons}
          </View>
        </View>
      );
    }
  }

  _renderButtonAndroid(button, callback) {
    if (button === null) {
      return null;
    } else if (typeof button === 'string') {
      return (
        <StaticContainer>
          <TouchableHighlight
            style={{
              alignItems: 'center', justifyContent: 'center',
              width: 80, height: 36, borderRadius: 1
            }}
            underlayColor={'rgba(0,0,0, 0.15)'}
            onPress={callback}
          >
            <Text style={{fontSize: FontSize.CHARACTER4, color: StaticColor.COLOR3}} singleLine={true}
                  ellipsizeMode='tail'>{button}</Text>
          </TouchableHighlight>
        </StaticContainer>
      );
    } else {
      return button;
    }
  }

  _renderButtonsIOS() {
    let buttons = null;
    let vertical = false;
    if (!_.isEmpty(this.props.buttonNeutral)) {
      buttons = [
        this._renderButtonIOS(this.props.buttonPositive, this.props.onPositive ? this.props.onPositive : this.hide,
          {borderBottomWidth: 0.5, borderBottomColor: StaticColor.COLOR5}),
        this._renderButtonIOS(this.props.buttonNegative, this.props.onNegative ? this.props.onNegative : this.hide,
          {borderBottomWidth: 0.5, borderBottomColor: StaticColor.COLOR5}),
        this._renderButtonIOS(this.props.buttonNeutral, this.props.onNeutral ? this.props.onNeutral : this.hide,
          {borderBottomLeftRadius: 7, borderBottomRightRadius: 7})
      ];
      if (buttons.length > 2) {
        vertical = true;
      }
    } else if (!_.isEmpty(this.props.buttonNegative)) {
      buttons = [
        this._renderButtonIOS(this.props.buttonNegative, this.props.onNegative ? this.props.onNegative : this.hide,
          {flex: 1, borderBottomLeftRadius: 7}),
        <View style={{height: 44, width: 0.5, backgroundColor: StaticColor.COLOR5}}/>,
        this._renderButtonIOS(this.props.buttonPositive, this.props.onPositive ? this.props.onPositive : this.hide,
          {flex: 1, borderBottomRightRadius: 7})
      ];
    } else {
      buttons = this._renderButtonIOS(this.props.buttonPositive, this.props.onPositive ? this.props.onPositive : this.hide,
        {flex: 1, borderBottomLeftRadius: 7, borderBottomRightRadius: 7}
      );
    }
    return buttons.length > 0 ? (
      <View style={[vertical ? {flexDirection: 'column'} : {flexDirection: 'row', alignItems: 'center'}]}
      >
        {buttons}
      </View>
    ) : null;
  }

  _renderButtonIOS(button, callback, style) {
    if (button === null) {
      return null;
    } else if (typeof button === 'string') {
      return (
        <StaticContainer>
          <TouchableHighlight
            style={[{
              alignItems: 'center', justifyContent: 'center', height: 44
            }, style]}
            underlayColor={'rgba(0,0,0, 0.15)'}
            onPress={callback}
          >
            <Text style={{fontSize: FontSize.CHARACTER4, color: StaticColor.COLOR3}} singleLine={true}
                  ellipsizeMode='tail'>{button}</Text>
          </TouchableHighlight>
        </StaticContainer>
      );
    } else {
      return button;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: 270,
    backgroundColor: StaticColor.COLOR7,
    borderRadius: isIOS ? 7 : 2,
    paddingTop: 24,
  },
  title: {
    fontSize: FontSize.CHARACTER2,
    color: StaticColor.COLOR1,
    textAlign: isIOS ? 'center' : 'left',
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12
  },
  contentStyle: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: isIOS ? 16 : 24
  },
  message: {
    fontSize: FontSize.CHARACTER13,
    color: StaticColor.COLOR1,
    textAlign: isIOS ? 'center' : null,
  },
  buttonsAndroid: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonsIOS: {
    borderTopWidth: 0.5,
    borderTopColor: StaticColor.COLOR5
  }
});
