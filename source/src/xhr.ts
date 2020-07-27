import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

import { parseHeaders } from './helpers/headers'

import { createError } from './helpers/error'
import { request } from 'http'

// 创建最基本的请求发送

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      // 设置响应类型
      request.responseType = responseType
    }

    if (timeout) {
      // 超时时间
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        // 超时和网络错误时，当前状态码也是0
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 获取请求头
      const responseData = responseType !== 'text' ? request.response : request.responseText // 根据设置的requsetType 来判断从response还是responseText获取响应数据
      const response: AxiosResponse = {
        // 响应类型
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      // resolve(response)
      handleResponse(response, resolve, reject)
    }

    request.onerror = () => {
      // reject(new Error("Network Error"))
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = () => {
      // 超时
      // reject(new Error(`Timeout of ${timeout} ms exceeded`))
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleUpperCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}

const handleResponse: (
  response: AxiosResponse,
  resolve: any,
  reject: any,
  config: AxiosRequestConfig,
  request: any
) => void = (response, resolve, reject, config, request) => {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    // reject(new Error(`Request faild with status code ${response.status}`))
    reject(
      createError(
        `Request faild with status code ${response.status}`,
        config,
        null,
        request,
        response
      )
    )
  }
}
