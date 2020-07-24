import { AxiosRequestConfig } from './types/index'

import { buildURL } from './helpers/url'

import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)

  xhr(config)
}

const processConfig: (config: AxiosRequestConfig) => void = config => {
  config.url = transformURL(config)
}

// 转换url
const transformURL: (config: AxiosRequestConfig) => string = config => {
  const { url, params } = config

  return buildURL(url, params)
}

export default axios
