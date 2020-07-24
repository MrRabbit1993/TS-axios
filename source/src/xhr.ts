import { AxiosRequestConfig, AxiosPromise } from './types/index'
import { resolve } from 'dns'

// 创建最基本的请求发送

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { url, method = 'get', data = null, headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      // 设置响应类型
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders() // 获取请求头
      const responseData = responseType !== 'text' ? request.response : request.responseText // 根据设置的requsetType 来判断从response还是responseText获取响应数据
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
