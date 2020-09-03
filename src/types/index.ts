// 项目工程  所有公共的类型定义文件

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH' // 约束methosd

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  [propName: string]: any // 增加一个字符串类型 供mergeConfig.ts里面merge使用
}

// export interface AxiosResponse {
//   data: any
//   status: number
//   statusText: string
//   headers: any
//   config: AxiosRequestConfig
//   request: any
// }
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// export interface AxiosPromise extends Promise<AxiosResponse> { }
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> { }

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  // request(config: AxiosRequestConfig): AxiosPromise
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

}

export interface AxiosInstance extends Axios { // 继承Axios的明确请求方法。形成混合接口
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> // 函数类型的定义签名
}


// 拦截器接口
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolvedFn<T>, rejected?: RejectedFn): number // 返回id便于eject删除一个拦截器

  eject(id: number): void
}

// 请求拦截器接口
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

// 响应拦截器接口
export interface RejectedFn {
  (err: any): any
}

// 请求或者响应转换函数
export interface AxiosTransformer {
  (data: any, headers?: any): any  // 参数是any类型的data和headers，返回值是any
}