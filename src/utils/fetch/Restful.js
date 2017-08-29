'use Strict';

export function addPathParams(url, bindParam) {
  let newUrl = url;
  if (bindParam && Object.keys(bindParam)) {
    for (let key in bindParam) {
      newUrl = newUrl.replace('${' + key + '}', bindParam[key]);
    }
  }
  return newUrl;
}

export function addQueryParams(url, bindParam) {
  if (bindParam === null) {
    return url;
  }
  if (url.indexOf('?') < 0) {
    url += '?';
  }
  for (let key in bindParam) {
    if (url.charAt(url.length - 1) !== '?') {
      url += '&';
    }
    url = url + key + '=' + bindParam[key];
  }


  return url;
}
