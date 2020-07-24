import { AxiosRequestConfig } from './types/index'

import { buildURL } from './helpers/url'

import { transformRequest } from './helpers/data'

import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)

  xhr(config)
}

const processConfig: (config: AxiosRequestConfig) => void = config => {
  config.url = transformURL(config)
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

export default axios
