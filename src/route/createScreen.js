/**
 * Created by Jackoder on 2017/6/12.
 */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import BaseScreen from '../views/pages/BaseScreen';
import _ from 'lodash';
import {fromLoadState} from '../views/widget/state/PageState';
import CommonStateComponent from '../views/widget/state/CommonStateComponent';
import AppEventEmitter from '../utils/AppEventEmitter';
import * as State from '../redux/State';

function createScreen(Page, screenName) {
  return new Builder(Page, screenName).create();
}

function Builder(Page, screenName) {
  class Instance {

    Page;
    screenName;
    storeObj;

    needInit;
    initPromise;

    constructor(Page, screenName) {
      this.Page = Page;
      this.screenName = screenName;
    }

    init(initPromise) {
      if (typeof initPromise === 'boolean') {
        if (initPromise === false) {
          this.needInit = false;
        } else {
          console.warn('initPromise is empty');
        }
      } else {
        this.initPromise = initPromise;
      }
      return this;
    }

    store(store) {
      this.storeObj = store;
      return this;
    }

    create() {
      const needInit = this.needInit;
      const initPromise = this.initPromise;
      class WrappedComponent extends Component {

        constructor(props) {
          super(props);
          this.state = {
            init: null,
            loadState: State.UNDEFINED
          };
        }

        componentWillMount() {
          if (needInit) {
            let paramsInit = _.get(this.props.navigation, 'state.params._init');
            if (this._hasInit(paramsInit)) {
              return;
            }
            this._init();
          }
        }

        render() {
          let initialization = this._getInit();
          let state = needInit ? (this._hasInit(initialization) ? State.SUCCESS : this.state.loadState) : State.SUCCESS;
          return (
            <CommonStateComponent
              state={fromLoadState(state, {a: 1})}
              retryRequest={this._init}
              renderContent={this._renderContent}
            />
          );
        }

        _init = () => {
          if (typeof initPromise === 'object') {
            this.setState({loadState: State.LOADING}, () => {
              initPromise
                .then(init => this.setState({init, loadState: State.SUCCESS}))
                .catch(err => this.setState({loadState: State.FAIL}));
            });
          }
        };

        _getInit = () => {
          let paramsInit = _.get(this.props.navigation, 'state.params._init') || this.state.init;
          return paramsInit || this.state.init;
        };

        _getConfig = () => {
          let paramsRoute = _.get(this.props.navigation, 'state.params.route', {}); 
          let paramsInit = this._getInit() || {};
          return {...paramsRoute, ...paramsInit};
        };

        _hasInit = config => (!config);

        _renderContent = () => (
          <Page _init={this._getConfig()}
                navigation={this.props.navigation}
                eventEmitter={AppEventEmitter}
                {...this.props.navigation.state.params}
          />
        );

      }

      const mapAllToProps = state => ({...state});

      const store = this.storeObj;
      const ConnectWrappedComponent = connect(mapAllToProps)(WrappedComponent);

      class Screen extends BaseScreen {

        static screenName = screenName;

        render() {
          return (
            store ? (
              <Provider store={store}>
                <ConnectWrappedComponent {...this.props} />
              </Provider>
            ) : <WrappedComponent {...this.props} />
          );
        }
      }

      //将Page的静态方法拷贝到Screen
      hoistNonReactStatic(Screen, this.Page);
      return Screen;
    }
  }
  return new Instance(Page, screenName);
}

module.exports = {createScreen, Builder}