import { isPlainObject } from './util'

// 标准化请求头属性
const normalizeHeaderName: (headers: any, normalizeName: string) => void = (
  Headers,
  normalizeName
) => {
  if (!Headers) return

  Object.keys(Headers).forEach(name => {
    if (name !== normalizeName && name.toLocaleUpperCase() === normalizeName.toUpperCase()) {
      Headers[normalizeName] = Headers[name]
      delete Headers[name]
    }
  })
}

// 处理请求头
export const processHeaders: (headers: any, data: any) => any = (headers, data) => {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    // 是普通对象
    if (headers && !headers['Content-Type']) {
      // 没有content-type 就默认一个
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// 转换响应头
export const parseHeaders: (headers: string) => any = headers => {
  let parsed = Object.create(null)
  if (!headers) return parsed // 如果是空字符串，直接返回空对象
  headers.split('\r\n').forEach(item => {
    let [key, val] = item.split(':')
    key = key.trim().toLowerCase()
    if (!key) return // 为空直接进入下次循环
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
