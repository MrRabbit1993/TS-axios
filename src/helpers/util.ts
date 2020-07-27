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