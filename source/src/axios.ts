import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

import { buildURL } from './helpers/url'

import { transformRequest, transformResponse } from './helpers/data'

import { processHeaders } from './helpers/headers'

import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)

  return xhr(config).then(res => transformResponseData(res))
}

const processConfig: (config: AxiosRequestConfig) => void = config => {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 转换url
const transformURL: (config: AxiosRequestConfig) => string = config => {
  const { url, params } = config

  return buildURL(url, params)
}

// 转换请求的data
const transformRequestData: (config: AxiosRequestConfig) => any = config => {
  return transformRequest(config.data)
}

// 转换请求头
const transformHeaders: (config: AxiosRequestConfig) => any = config => {
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}

const transformResponseData: (res: AxiosResponse) => AxiosResponse = res => {
  res.data = transformResponse(res.data)
  return res
}

export default axios
