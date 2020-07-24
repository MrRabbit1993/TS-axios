import { isDate, isPlainObject } from './util'

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

export const buildURL: (url: string, params?: any) => string = (url, params) => {
  if (!params) return url

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

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams // 这里表示需要判断当前地址上是否有参数了，有就拼接
  }
  return url
}
