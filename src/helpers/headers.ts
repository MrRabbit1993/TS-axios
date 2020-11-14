import { isPlainObject, deepMerge } from './util'
import { Method } from './../types'

// 标准化请求头属性
const normalizeHeaderName: (headers: any, normalizeName: string) => void = (
  Headers,
  normalizeName
) => {
  if (!Headers) return

  Object.keys(Headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      // console.log(name, name.toUpperCase(), name.toUpperCase() === normalizeName.toUpperCase(), "===========", normalizeName, normalizeName.toUpperCase())
      Headers[normalizeName] = Headers[name]
      // console.log("---", Headers[name])
      // console.log(name)
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
    let [key, ...vals] = item.split(':')
    key = key.trim().toLowerCase()
    if (!key) return // 为空直接进入下次循环
    const val = vals.join(':').trim()
    parsed[key] = val
  })
  return parsed
}
// 请求头合并
export const flattenHeaders: (headers: any, method: Method) => any = (headers, method) => {
  if (!headers) return headers
  headers = deepMerge(headers.common, headers[method], headers) // 将common与method合并在header上
  const methodsToDelete: string[] = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common'
  ] // 需要移除的
  methodsToDelete.forEach(method => delete headers[method]) // 合并后移除上述的methods
  return headers
}
