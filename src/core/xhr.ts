import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { parseHeaders } from '../helpers/headers'

import { createError } from '../helpers/error'

import { isURLSameOrigin } from '../helpers/url'

import cookie from '../helpers/cookie'

import { isFormData } from '../helpers/util'

// 创建最基本的请求发送

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method,
      data = null,
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    request.open(method!.toUpperCase(), url!, true) // 这里采取类型断言，断言这个url不会为空

    configRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    // 处理配置项
    function configRequest(): void {
      if (responseType) {
        // 设置响应类型
        request.responseType = responseType
      }

      if (timeout) {
        // 超时时间
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    // 添加事件处理函数
    function addEvents(): void {
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return
        }

        if (request.status === 0) {
          // 超时和网络错误时，当前状态码也是0
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 获取请求头
        const responseData =
          responseType && responseType !== 'text' ? request.response : request.responseText // 根据设置的requsetType 来判断从response还是responseText获取响应数据
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
        handleResponse(response)
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

      if (onDownloadProgress) {
        // 配置了下载进度
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        // 配置了上传进度
        request.upload.onprogress = onUploadProgress
      }
    }
    // 处理请求头相关操作
    function processHeaders(): void {
      // 是formData类型,删除默认的content-type，自动设置
      if (isFormData(data)) {
        delete headers['Content-type']
      }

      // 设置了withCredentials 或者是同源
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          // 有cookie的值，直接附加到当前的header里面
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLocaleUpperCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    // 处理取消相关操作
    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort() // 终止请求
          reject(reason) // 抛出错误
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      const { status } = response
      if (!validateStatus || validateStatus(status)) {
        resolve(response)
      } else {
        reject(
          createError(`Request failed with status code ${status}`, config, null, request, response)
        )
      }
    }
  })
}
