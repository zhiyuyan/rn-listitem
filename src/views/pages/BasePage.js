/**
 * Created by Jackoder on 2017/6/12.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

import DebugLog from '../../utils/DebugLog';
import {NdInstances} from '@sdp.nd/react-appfactory-wrapper';

export default class BasePage extends Component {

  static ndNavigationOptions = {
    header: null,
  }

  static propTypes = {
    init: PropTypes.object,
  }

  static stackHistory = [];

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BasePage.stackHistory.push({name: this.props.navigation.state.routeName, key: this.props.navigation.state.key});
  }

  componentWillUnmount() {
    for (let i = BasePage.stackHistory.length - 1; i >= 0; i--) {
      let temp = BasePage.stackHistory[i];
      if (temp.name === this.props.navigation.state.routeName) {
        BasePage.stackHistory.splice(i, BasePage.stackHistory.length - i);
        return;
      }
    }
  }

  /* eslint no-return-assign: "off"*/
  _bind(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this));
  }

  getConfig = () => (this.props._init);

  go = (screenName, param) => {
    const passParam = {_init:this.getConfig(), ...param};
    if (_.has(this.props, 'navigation') && !_.isEmpty(screenName)) {
      DebugLog.log('navigate', screenName, passParam);
      this.props.navigation.navigate(screenName, passParam);
    } else {
      DebugLog.log('navigate failed', screenName, passParam);
    }
  };

  goBack = (screenName) => {
    let found = false;
    for (let temp of BasePage.stackHistory) {
      if (found) {
        if (this.props.navigation.goBack(temp.key)) {
          return;
        } else {
          break;
        }
      }
      if (temp.name === screenName) {
        found = true;
      }
    }
    this.props.navigation.goBack();
  };

  exit = () => {
    NdInstances.sdp_appfactory.finishCurrentPage({});
  };
}
