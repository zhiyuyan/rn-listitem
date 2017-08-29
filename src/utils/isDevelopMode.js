'use strict';
export default function isDevelopMode() {
  let isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
  if (isDebuggingInChrome) {
    return true;
  }
  return false;
}
