// 针对post类型的data数据做转换
import { isPlainObject } from './util'

export const transformRequest: (data: any) => any = data => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export const transformResponse: (data: any) => any = data => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // 不处理
    }
  }
  return data
}
