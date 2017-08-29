'use strict';

import React, {Component, PropTypes} from 'react';
import LoadingComponent from './LoadingComponent';
import EmptyComponent from './EmptyComponent';
import LoadFailComponent from './LoadFailComponent';
import * as PageState from './PageState';

export default class CommonStateComponent extends Component {

  static propTypes = {
    state: PropTypes.number.isRequired,
    renderContent: PropTypes.func.isRequired,
    retryRequest: PropTypes.func
  }

  render() {
    switch (this.props.state) {
      case PageState.SHOW_CONTENT:
        if (this.props.renderContent) {
          return this.props.renderContent();
        }
      case PageState.SHOW_EMPTY:
        return this._renderEmpty();
      case PageState.SHOW_LOADING:
        return this._renderLoading();
      case PageState.SHOW_LOAD_FAIL:
        return this._renderLoadFail(this, this.props.retryRequest);
      default:
        return this._renderLoading();
    }
  }

  _renderLoading = () => <LoadingComponent />;

  _renderEmpty = () => <EmptyComponent />;

  _renderLoadFail = () => <LoadFailComponent retryRequest={this.props.retryRequest} />;
}

