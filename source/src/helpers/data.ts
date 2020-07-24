// 针对post类型的data数据做转换
import { isPlainObject } from './util'

export const transformRequest: (data: any) => any = data => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}
