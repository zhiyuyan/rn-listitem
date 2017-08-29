/**
 * Created by Jackoder on 2017/5/25.
 */
'use strict';

import * as HttpMethod from './HttpMethod';

export default class Request {

  /**
   * 需要将参数编码在url上面的方法
   *
   * @static
   *
   * @memberof NetRequest
   */
  static HTTPMethodsEncodingParametersInURI = [HttpMethod.GET, HttpMethod.DELETE];

  /**
   * 请求的地址
   *
   * @type {string}
   * @memberof NetRequest
   */
  url;

  /**
   * 绑定参数 可以将URL中的${key}替换
   *
   * @type {Object}
   * @memberof NetRequest
   */
  bindParam;

  /**
   * url参数 如果是get请求 编码在url里面 post编码在body里面
   *
   * @type {Object}
   * @memberof NetRequest
   */
  param;

  /**
   * 请求方法
   *
   * @type {string}
   * @memberof NetRequest
   */
  method;

  //TODO 头部
  header;

  /**
   * 异常上报的标识
   *
   * @type {string}
   * @memberof NetRequest
   */
  logger;

  constructor(method = HttpMethod.GET, url = '', bindParam = {}, param = {}, header, logger) {
    this.method = method;
    this.url = url;
    this.bindParam = bindParam;
    this.param = param;
    this.header = header;
    this.logger = logger;

    this.buildUrl();
  }


  buildUrl() {
    if (Request.HTTPMethodsEncodingParametersInURI.includes(this.method)) {
      let paramKeys = this.param && Object.keys(this.param);
      let url = this.url;

      //添加query
      if (paramKeys) {
        for (let key of paramKeys) {
          url = this.addQueryParams(url, key, this.param[key]);
        }
      }

      //重新复制url,并将data清空
      this.url = url;
      this.param = {};
    }
  }

  addQueryParams(url, name, value) {
    //底层会做编码，这里编码会报错 与字符串相加 自动转换成字符串
    let pair = name + '=' + value;

    if (url.indexOf('?') < 0) {
      //不包含?
      return url + '?' + pair;
    } else {
      return url + '&' + pair;
    }
  }
}