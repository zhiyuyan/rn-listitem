/**
 * Created by Jackoder on 2017/6/28.
 */
'use strict';

const create = (type, promise, meta) => ({
  type: type,
  payload: {
    promise: promise,
    meta
  }
});

module.exports = {create};