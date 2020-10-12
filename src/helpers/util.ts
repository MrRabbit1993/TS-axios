const toString = Object.prototype.toString

// 是否是日期类型
export const isDate: (val: any) => val is Date = (val: any): val is Date => {
  return toString.call(val) === '[object Date]'
}

// 是否是对象

export const isObject: (val: any) => val is Object = (val: any): val is Object => {
  return val !== null && typeof val === 'object'
}

// 是否是普通对象,非formData blob 等之类

export const isPlainObject: (val: any) => val is Object = (val: any): val is Object => {
  return toString.call(val) === '[object Object]'
}


// 拷贝函数

// export const extend: <T, U>(to: T, from: U) => T & U = (to, from) => {// 采取交叉类型实现
//   for (const key in from) {
//     ; (to as T & U)[key] = from[key] as any
//   }
//   return to as T & U
// }
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ; (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export const deepMerge: (...objs: any[]) => any = (...objs) => {// 深拷贝
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {// obj是any 所以需要判断
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {// 值是对象 直接递归
          result[key] = isPlainObject(result[key]) ? deepMerge(result[key], val) : deepMerge(val)// 如果值的对象里面有起始的key，则将key与其实key合并
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

export function isFormData(val: any): val is FormData {
  return typeof val !== "undefined" && val instanceof FormData
}