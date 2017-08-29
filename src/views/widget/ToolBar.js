/**
 * Created by Jackoder on 2017/6/19.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ColorPropType,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  BackHandler
} from 'react-native';
import {
  FontSize,
  StaticColor
} from '../base';
import _ from 'lodash';
import NdModules from '@sdp.nd/nd-react-wrapper';
import ModalDropDown from 'react-native-modal-dropdown';

const isIOS = Platform.OS === 'ios';
const APPBAR_HEIGHT = isIOS ? 44 : 48;
const STATUSBAR_HEIGHT = isIOS ? 20 : StatusBar.currentHeight;
const ImageWidth = 30;
const MARGIN10 = 10;
const MenuHeight = 44;
const MaxDropDownMenuNum = 5;

export default class ToolBar extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    logo: PropTypes.number,
    actions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.number,
      show: PropTypes.oneOf(['always', 'ifRoom', 'never']), //ifRoom暂不支持
      showWithText: PropTypes.bool
    })),
    contentInsetEnd: PropTypes.number,
    contentInsetStart: PropTypes.number,
    navIcon: PropTypes.number,
    navText: PropTypes.string,
    onActionSelected: PropTypes.func,
    onIconClicked: PropTypes.func,
    subtitle: PropTypes.string,
    subtitleColor: ColorPropType,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    titleColor: ColorPropType
  };

  static defaultProps = {
    titleColor: StaticColor.COLOR1,
    subtitleColor: StaticColor.COLOR4,
    navIcon: require('../../../res/back.png'),
    contentInsetStart: MARGIN10,
    contentInsetEnd: MARGIN10
  };

  constructor(props) {
    super(props);
    this.initTempValue(props);
    this.state = {
      titleContainerStyle: null,
    };
  }

  initTempValue(props) {
    this.isShowNavText = isIOS && this.props.navText != null;
    this.leftLayout = this.isShowNavText || this.props.navIcon ? null : {width: 0};
    this.titleLayout = null;
    this.titleContainerLayout = null;
    this.rightLayout = this.props.actions ? null : {width: 0};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.androidBackHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.androidBackHandle);
  }

  androidBackHandle = () => {
    this._onNavPress();
    return true;
  };

  componentWillReceiveProps(nextProps) {
    this.initTempValue(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.props.logo, nextProps.logo)
        && _.isEqual(this.props.actions, nextProps.actions)
        && _.isEqual(this.props.contentInsetEnd, nextProps.contentInsetEnd)
        && _.isEqual(this.props.contentInsetStart, nextProps.contentInsetStart)
        && _.isEqual(this.props.navIcon, nextProps.navIcon)
        && _.isEqual(this.props.navText, nextProps.navText)
        && _.isEqual(this.props.subtitle, nextProps.subtitle)
        && _.isEqual(this.props.subtitleColor, nextProps.subtitleColor)
        && _.isEqual(this.props.title, nextProps.title)
        && _.isEqual(this.props.titleColor, nextProps.titleColor)) {
      if (_.isEqual(this.state, nextState)) {
        return false;
      }
    } else {
      this.hasLayout = false;
    }
    return true;
  }

  render() {
    const containerStyle = {paddingLeft: this.props.contentInsetStart, paddingRight: this.props.contentInsetEnd};
    return (
      <View style={[styles.container, containerStyle]}>
        {this._renderNavIcon()}
        {this._renderCenter()}
        {this._renderActions()}
      </View>
    );
  }

  _renderCenter = () => {
    const platformStyle  = isIOS ? {alignItems: 'center'} : null;
    return (
      <View style={[this.state.titleContainerStyle == null ?
        {flex: 1, justifyContent: 'center'} : this.state.titleContainerStyle, platformStyle]}
        onLayout={this._onTitleContainerLayout}
      >
        {this._renderTitle()}
      </View>
    );
  };

  _onTitleContainerLayout = e => {
    if (!this.leftLayout || !this.titleLayout || !this.rightLayout) {
      if (e) {
        this.titleContainerLayout = e.nativeEvent.layout;
      }
      return;
    } else if (this.hasLayout) {
      return;
    }
    if (!this.titleContainerLayout) {
      this.titleContainerLayout = e.nativeEvent.layout;
    }

    const Width = Dimensions.get('window').width;
    const rightWidth = this._getRightWidth() + this.props.contentInsetEnd;
    let cutWidth = 0;
    if (isIOS && (Width - this.titleLayout.width) / 2 < rightWidth) {
      cutWidth = rightWidth;
    } else {
      cutWidth = this.leftLayout.width + this.props.contentInsetStart;
    }
    this.hasLayout = true;
    this.setState({
      titleContainerStyle: {
        position: 'absolute',
        left: cutWidth,
        top: this.titleContainerLayout.y,
        width: isIOS ? Width - 2 * (cutWidth) : Width - cutWidth - rightWidth,
        height: this.titleContainerLayout.height,
        justifyContent: 'center',
        alignItems: isIOS ? 'center' : 'flex-start'
      }
    });
  };

  _onTitleLayout = e => {
    this.titleLayout = e.nativeEvent.layout;
    this._checkTitleContainerLayout();
  };

  _onActionsLayout = e => {
    this.rightLayout = e.nativeEvent.layout;
    this._checkTitleContainerLayout();
  };

  _onNavLayout = e => {
    this.leftLayout = e.nativeEvent.layout;
    this._checkTitleContainerLayout();
  };

  _checkTitleContainerLayout = () => {
    if (!this.hasLayout && this.titleContainerLayout) {
      this._onTitleContainerLayout();
    }
  };

  _getRightWidth = () => {
    if (this.rightLayout) {
      return this.rightLayout.width;
    }
    return 0;
  };

  _renderActions = () => {
    let children = [];
    let hideChildren = [];
    if (this.props.actions) {
      let key = 0;
      this.props.actions.forEach(action => {
        if (action.show === 'always') {
          children.push(
            action.showWithText && !_.isEmpty(action) ? (
              <TouchableOpacity key={key++} onPress={() => this.props.onActionSelected(action)}>
                <View style={styles.actionContainer}>
                  <Image style={styles.imageAction} source={action.icon} />
                  <Text style={styles.textAction} numberOfLines={1} ellipsizeMode={'tail'}>{action.title}</Text>
                </View>
              </TouchableOpacity>
            ) : this._renderImageAction(
            action.icon, () => {
              this.props.onActionSelected && this.props.onActionSelected(action);
            }, {style: {marginLeft: MARGIN10}, key: key++}
          ));
        } else {
          hideChildren.push(action);
        }
      });
      if (this.props.actions.length > children.length) {
        children.push(
          <ModalDropDown
            key={key++}
            style={{marginLeft: MARGIN10}}
            dropdownStyle={{height: (MenuHeight + 0.5) * Math.min(hideChildren.length, MaxDropDownMenuNum) + 0.5, borderRadius: 3, elevation: 2}}
            options={hideChildren}
            animated={false}
            showsVerticalScrollIndicator={false}
            renderRow={this._renderDropDownAction}
            renderSeparator={this._renderSeparator}
            onSelect={this._onDropDownMenuClick}
          >
            <Image style={styles.imageAction} source={require('../../../res/menu.png')} />
          </ModalDropDown>
        );
      }
      return (
        <View style={[styles.actionsContainer, {right: this.props.contentInsetEnd}]} onLayout={this._onActionsLayout}>{children}</View>
      );
    }
    return null;
  };

  _renderDropDownAction = (action, sectionID, rowID, highlightRow) => (
    <TouchableOpacity>
      <View style={styles.menuContainer}>
        <Image style={styles.imageAction} source={action.icon} />
        <Text style={styles.menuText} numberOfLines={1} ellipsizeMode={'tail'}>{action.title}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderSeparator = () => <View style={styles.divider} />;

  _onDropDownMenuClick = (id, action) => {
    this.props.onActionSelected && this.props.onActionSelected(action);
  };

  _renderNavIcon = () => {
    if (this.isShowNavText) {
      return this._renderTextAction(this.props.navText, this._onNavPress, {onLayout: this._onNavLayout});
    } else {
      return this._renderImageAction(this.props.navIcon, this._onNavPress, {onLayout: this._onNavLayout});
    }
  };

  _onNavPress = () => {
    if (this.props.onIconClicked) {
      this.props.onIconClicked();
      return;
    }
    if (!_.get(this.props, 'navigation.state.key', 'Init').startsWith('Init')) {
      this.props.navigation.goBack();
    } else {
      NdModules.NdInstances.sdp_appfactory.finishCurrentPage({});
    }
  };

  _renderImageAction = (source, onPress, props) => (
    source ? (
      <TouchableOpacity onPress={onPress} key={_.get(props, 'key')}>
        <Image {...props} style={[styles.imageAction, _.get(props, 'style')]} source={source} />
      </TouchableOpacity>
    ) : null
  );

  _renderTextAction = (text, onPress, props) => (
    text ? (
      <TouchableOpacity onPress={onPress} key={_.get(props, 'key')}>
        <Text {...props} style={[styles.textAction, styles.textActionPadding, _.get(props, 'style')]} numberOfLines={1} ellipsizeMode={'tail'}>{text}</Text>
      </TouchableOpacity>
    ) : null
  );

  _renderTitle = () => {
    const titleElement = typeof (this.props.title) === 'string' ? (
        <Text style={[styles.title, {color: this.props.titleColor}]}
              numberOfLines={1} ellipsizeMode={'tail'} onLayout={this._onTitleLayout}
        >
          {this.props.title}
        </Text>
    ) : <View onLayout={this._onTitleLayout}>{this.props.title}</View>;
    const subtitleElement = this.props.subtitle == null ? null : (
      <Text style={[styles.subtitle, {color: this.props.subtitleColor}]}
            numberOfLines={1} ellipsizeMode={'tail'}
      >
        {this.props.subtitle}
      </Text>
    );
    return (
      <View style={[styles.titleContainer]}>
        {titleElement}
        {subtitleElement}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: isIOS ? STATUSBAR_HEIGHT + APPBAR_HEIGHT : APPBAR_HEIGHT,
    paddingTop: isIOS ? STATUSBAR_HEIGHT : 0,
    backgroundColor: StaticColor.COLOR10,
    borderBottomWidth: 0.5,
    borderBottomColor: StaticColor.COLOR5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageAction: {
    width: ImageWidth,
    height: ImageWidth
  },
  textAction: {
    fontSize: FontSize.CHARACTER4,
    color: StaticColor.COLOR2,
  },
  textActionPadding: {
    paddingRight: MARGIN10,
    paddingTop: MARGIN10,
    paddingBottom: MARGIN10
  },
  title: {
    textAlign: isIOS ? 'center' : 'left',
    fontSize: FontSize.CHARACTER1,
  },
  subtitle: {
    textAlign: isIOS ? 'center' : 'left',
    fontSize: FontSize.CHARACTER8,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  actionsContainer: {
    paddingTop: isIOS ? STATUSBAR_HEIGHT : 0,
    flexDirection: 'row',
    position: 'absolute'
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ImageWidth
  },
  menuContainer: {
    backgroundColor: StaticColor.COLOR7,
    height: MenuHeight,
    width: 145,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: MARGIN10,
    paddingRight: MARGIN10
  },
  menuText: {
    flex: 1,
    marginLeft: MARGIN10,
    fontSize: FontSize.CHARACTER14,
    color: StaticColor.COLOR1
  },
  divider: {
    height: 0.5,
    backgroundColor: StaticColor.COLOR9
  }
});
