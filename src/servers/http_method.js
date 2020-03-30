import Taro from "@tarojs/taro"
/* eslint-disable import/prefer-default-export */
import HTTP_REQUEST from "./http_request"


/**
 * 根据jscode获取openid、session_key
 * @param jscode
 * @returns {Taro.RequestTask<any>}
 */
export const getAuthInfo = (jscode) => {
  return HTTP_REQUEST.get('/miniprogram/auth/' + jscode)
}

/**
 * 删除上传的图片
 * @param fileName
 * @returns {Taro.RequestTask<any>}
 */
export const deleteFile = (fileName) => {
  return HTTP_REQUEST.delete('/file/delete/' + fileName)
}

/**
 * 测试数据
 * @param pageIndex
 * @returns {Promise<{hasMore: boolean, list: any, isLoaded: boolean}>}
 */
export const getListData = async (pageIndex = 1) => {
  const data = await Taro.request({
    url: 'https://cnodejs.org/api/v1/topics',
    data: {
      limit: 10,
      page: pageIndex
    }
  })
  let hasMore = false
  if (data.data.length === 10) {
    hasMore = true
  }
  return {list: data.data, hasMore: hasMore, isLoaded: pageIndex === 1};
}
