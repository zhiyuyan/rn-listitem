'use Strict';

/**
 * 封装请求处理
 * FIXME 1. 需要完成uc错误处理
 * FIXME 2. 如何替换path参数
 */

import SdpUc from './UcModule';
import NdModules from '@sdp.nd/nd-react-wrapper';
import * as DebugLog from '../DebugLog';

/**
 * 封装uc请求，对外提供统一的请求方式
 * @param path 请求路径
 * @param method 请求方式
 * @param params 请求参数
 * @returns {Promise} json对象
 */

const BIZ_NAME = 'UC';
const AUTH_TOKEN_EXPIRED = BIZ_NAME + '/AUTH_TOKEN_EXPIRED';
const AUTH_INVALID_TOKEN = BIZ_NAME + '/AUTH_INVALID_TOKEN';
const AUTH_INVALID_TIMESTAMP = BIZ_NAME + '/AUTH_INVALID_TIMESTAMP';
const NONCE_INVALID = BIZ_NAME + '/NONCE_INVALID';

export function request(method, host, path, body, headers) {
  let url = host + path;

  DebugLog.log('request url --> ' + url);
  return new Promise((resolve, reject) => {
    let responseRef;

    ucRequest(url, method, body, headers)
      .then((response) => {
        responseRef = response;
        return response.json();
      })
      .then((content) => {
        if (responseRef.ok) {
          resolve(content);
        } else {
          if (responseRef.status === 401 || responseRef.status === 500) {
            ucErrorHandler(url, method, content, resolve, reject);
          } else {
            throw content.message;
          }
        }
      })
      .catch((error) => {
        DebugLog.log('error', error);
        reject(error);
      });
  });
}

function ucRequest(url, method, body, headers) {
  return SdpUc.getUcHeader(url, method)
    .then((ucHeaders) => {

      for (let key in headers) {
        ucHeaders[key] = headers[key];
      }

      ucHeaders['Accept'] = 'application/json';
      ucHeaders['Content-Type'] = 'application/json';
      DebugLog.log('ucHeaders', ucHeaders);
      DebugLog.log('body', body);

      let request = new Request(url, {
        method: method,
        headers: ucHeaders,
        body: body
      });
      return fetch(request);
    });
}

function ucErrorHandler(url, method, content, resolve, reject) {
  DebugLog.log('ucErrorHandler', content);
  switch (content.code) {
    case AUTH_TOKEN_EXPIRED:
      ucTokenExpired(url, method, resolve, reject);
      break;

    case AUTH_INVALID_TIMESTAMP:
      ucInvalidTimestamp(url, method, resolve, reject);
      break;

    case AUTH_INVALID_TOKEN:
      ucInvalidToken();
      break;

    case NONCE_INVALID:
      ucNonceInvalid(url, method, resolve, reject);
      break;

    default:
      reject(content.message);
      break;
  }
}

/**
 * 处理UC Token过期
 * @param url
 * @param method
 * @param resolve
 * @param reject
 */
function ucTokenExpired(url, method, resolve, reject) {
  let responseRef;

  SdpUc.getRefreshToken()
    .then((token) => {
      return SdpUc.refreshToken(token);
    })
    .then((ok) => {
      if (ok) {
        return ucRequest(url, method);
      } else {
        throw 'refresh token fail';
      }
    })
    .then((response) => {
      responseRef = response;
      return response.json();

    })
    .then((content) => {
      if (responseRef.ok) {
        resolve(content);
      } else {
        throw content.message;
      }
    })
    .catch((error) => {
      reject(error);
    });
}

function ucInvalidTimestamp(url, method, resolve, reject) {
  let responseRef;

  SdpUc.updateServerTime()
    .then((ok) => {
      if (ok) {
        return ucRequest(url, method);
      } else {
        throw 'update server time fail';
      }
    })
    .then((response) => {
      responseRef = response;
      return response.json();

    })
    .then((content) => {
      if (responseRef.ok) {
        resolve(content);
      } else {
        throw content.message;
      }
    })
    .catch((error) => {
      reject(error);
    });
}

function ucInvalidToken() {
  NdModules.NdInstances.sdp_appfactory.goPage({'page': 'cmp://com.nd.sdp.uc_component/logout'});
}

function ucNonceInvalid(url, method, resolve, reject) {
  let responseRef;

  ucRequest(url, method)
    .then((response) => {
      responseRef = response;
      return response.json();

    })
    .then((content) => {
      if (responseRef.ok) {
        resolve(content);
      } else {
        throw content.message;
      }
    })
    .catch((error) => {
      reject(error);
    });
}
