'use strict';

import * as HttpMethod from './HttpMethod';
import {
  NdInstances
} from '@sdp.nd/nd-react-wrapper';
import DebugLog from '../DebugLog';
import _ from 'lodash';

const PARAMS_IS_NULL = 600;//:  表示由于参数为null，还未发送请求的错误码;
const RESPONSE_IS_NULL = 666;//:  表示native发送请求成功，但是返回结果为空的错误码;
const CONNECTOR_ERROR_BEGIN = 1000;
const CONNECTOR_ERROR_END = 1099;
const CLIENT_ERROR_BEGIN = 400;
const CLIENT_ERROR_END = 499;
const STATUS_SUCCESS_BEGIN = 200;
const STATUS_SUCCESS_END = 299;
const SERVER_ERROR_BEGIN = 500;
const SERVER_ERROR_END = 599;
const CUSTOMIZE_BEGIN = 1100;
const CUSTOMIZE_END = 1199;
const STATUS_UNKNOWN_ERROR = 1000;
const STATUS_NETWORK_CONNECTION_FAILED = 1001;
const STATUS_NETWORK_CONNECTION_TIMEOUT = 1002;
const STATUS_CANCEL_BY_INTERCEPTOR = 1101;

export default class RestClient {

  fetch(request) {
    return this.makeRequestPromise(request)
      .then(response => {
        if (response.code >= 200 && response.code <= 299) {
          return response.data;
        }
        return this.handleErrorResponse(response, request.logger);
      })
      .catch(response => {
        return this.handleErrorResponse(response, request.logger);
      });
  }

  timeoutFetch(request, ms = 30000) {
    return Promise.race([this.fetch(request), this.timeoutPromise(ms)]);
  }

  timeoutPromise(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({message: '请求超时'});
      }, ms);
    });
  }

  makeRequestPromise(request) {
    let restDao = NdInstances.sdp_restDao;
    let requestParam = {
      uri: request.url,
      param: {},
      data: {},
      options: {}
    };

    if (!_.isEmpty(request.bindParam)) {
      requestParam.param = request.bindParam;
    }

    if (!_.isEmpty(request.param)) {
      requestParam.data = request.param;
    }

    if (!_.isEmpty(request.header)) {
      requestParam.options = {
        _maf_header: request.header
      };
    }

    DebugLog.log('begin restDao requestParam:%o', requestParam);

    switch (request.method) {
      case HttpMethod.GET:
        return restDao.get(requestParam);
      case HttpMethod.POST:
        return restDao.post(requestParam);
      case HttpMethod.PUT:
        return restDao.put(requestParam);
      case HttpMethod.PATCH:
        return restDao.patch(requestParam);
      case HttpMethod.DELETE:
        return restDao.delete(requestParam);
      default:
        return new Promise.reject('error method');
    }
  }

  handleErrorResponse(response, logger) {
    const code = response.code;
    let message = "您访问的资源不存在";
    //FIXME 暂时都使用应用工厂提供的报错
    /*if (code == STATUS_NETWORK_CONNECTION_FAILED
      || code == STATUS_NETWORK_CONNECTION_TIMEOUT
      || code == STATUS_CANCEL_BY_INTERCEPTOR
      || code >= CONNECTOR_ERROR_BEGIN && code <= CONNECTOR_ERROR_END) {
      message = "网络不可用，请检查您的网络";
    } else if (code == PARAMS_IS_NULL) {
      message = "参数为空";
    } else if (code == RESPONSE_IS_NULL) {
      message = "返回结果为空"
    } else if (code >= CUSTOMIZE_BEGIN && code <= CUSTOMIZE_END) {
      DebugLog.log(code, _.get(response, 'data.message'), response);
      message = "网络出现故障，请上传日志帮助我们进一步分析问题";
    }*/
    this.reportException(response, logger);
    if (_.has(response, 'data.message')) {
      message = response.data.message;
    }
    DebugLog.log(code, message, response);
    return new Promise.reject(message);
  }

  reportException(response, logger) {
    if (_.isEmpty(logger) || _.isEmpty(response.trace_id)) {
      return;
    }
    const traceId = response.trace_id;
    let ret = NdInstances.sdp_appfactory.reportException({
      "logger": Config.RN_NAME,
      "errorCode": response.code,
      "message": _.get(response, 'data.message'),
      "level": "warn",
      "errorStack": "具体堆栈信息",
      "traceId": traceId,
      "extras": {

      }
    });
    DebugLog.log("reportException ret:", ret);
  }
}
