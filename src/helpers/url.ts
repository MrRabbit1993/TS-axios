import { isDate, isPlainObject, isURLSearchParams } from './util'

interface URLORigin {
  protocol: string,
  host: string
}

const encode: (val: string) => string = val => {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') // 空格变+
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const buildURL: (url: string, params?: any, paramsSerializer?: (params: any) => string) => string = (url, params, paramsSerializer) => {
  if (!params) return url

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      const val = params[key]

      // 过滤掉无效的数据
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values = []

      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams // 这里表示需要判断当前地址上是否有参数了，有就拼接
  }
  return url
}

const urlParsingNode = document.createElement("a")

// 辅助函数 解析域名相关信息
const resolveURL: (url: string) => URLORigin = (url) => {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return { protocol, host }
}
const currentOrigin = resolveURL(window.location.href) // 解析当前页面的域名
// 是否是同源请求
export const isURLSameOrigin: (requestURL: string) => boolean = (requestURL) => {
  const parseOrigin = resolveURL(requestURL)
  return (parseOrigin.protocol === currentOrigin.protocol && parseOrigin.host === currentOrigin.host)
}

// 是否绝对地址
export const isAbsoluteURL: (url: string) => boolean = (url) => {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export const combineURL: (baseURL: string, relativeURL?: string) => string = (baseURL, relativeURL) => {
  // 取消baseURL结尾的/ 去掉相对路径前面的/
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}