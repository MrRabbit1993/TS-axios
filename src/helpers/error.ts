import { AxiosRequestConfig, AxiosResponse } from './../types'

type CODE = string | null

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: CODE
  request?: string
  response?: AxiosResponse
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: CODE,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    Object.setPrototypeOf(this, AxiosError.prototype) // 解决ts内置错误。比如实例调取不到方法等
  }
}

export const createError: (
  message: string,
  config: AxiosRequestConfig,
  code?: CODE,
  request?: any,
  response?: AxiosResponse
) => any = (message, config, code, request, response) => {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
