import Taro from '@tarojs/taro'
import getBaseUrl from './base_url'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

// eslint-disable-next-line @typescript-eslint/class-name-casing
class http_request {

  baseOptions(params, method = "GET") {
    const {url, data} = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'AccessToken': Taro.getStorageSync('AccessToken')
      }
    };
    return Taro.request(option);
  }

  /**
   * GET请求
   * @param url
   * @param data
   * @param callback 回调函数
   * @returns {Taro.RequestTask<any>}
   */
  get(url, data = "") {
    const option = {url, data};
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    const params = {url, data, contentType};
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    const option = {url, data};
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    const option = {url, data};
    return this.baseOptions(option, "DELETE");
  }

}

export default new http_request()
