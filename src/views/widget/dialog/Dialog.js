/**
 * Created by Jackoder on 2017/7/13.
 */
import React, {Component, PropTypes} from 'react';
import {
  Modal,
  View,
  ViewPropTypes,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

/**
 * Dialog基础组件
 */
export default class Dialog extends Component {

  static propTypes = {
    ...Modal.propTypes,
    onRequestClose: PropTypes.func,
    canceledOnTouchOutside: PropTypes.bool,

    contentView: PropTypes.object.isRequired,
    backgroundStyle: ViewPropTypes.style
  };

  static defaultProps = {
    ...Modal.defaultProps,
    transparent: true,
    visible: false,
    canceledOnTouchOutside: true
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    };
  }

  show = () => {
    this.setState({visible: true});
  }

  hide = () => {
    this.setState({visible: false});
  }

  render() {
    let onRequestClose = this.props.onRequestClose;
    if (!onRequestClose) {
      onRequestClose = this._onRequestClose;
    }
    const ContainerComp = this.props.canceledOnTouchOutside ? TouchableWithoutFeedback : View;
    const content = (
      <View style={[styles.bg, this.props.backgroundStyle]}>
        <TouchableWithoutFeedback>
          {this.props.contentView}
        </TouchableWithoutFeedback>
      </View>
    );
    return (
      <Modal onRequestClose={onRequestClose}
             animationType={this.props.animationType}
             onShow={this.props.onShow}
             transparent={this.props.transparent}
             onOrientationChange={this.props.onOrientationChange}
             supportedOrientations={this.props.supportedOrientations}
             visible={this.state.visible}>
        <ContainerComp onPress={this.hide}>
          {content}
        </ContainerComp>
      </Modal>
    );
  }

  _onRequestClose = () => {
    this.hide();
  };

}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)'
  },
});