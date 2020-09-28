import { AxiosRequestConfig, AxiosStatic } from "./types"

import Axios from "./core/Axios"

import { extend } from "./helpers/util"

import defaults from "./default"

import mergeConfig from "./core/mergeConfig"

import CancelToken from "./cancel/cancelToken"
import Cancel, { isCancel } from "./cancel/cancel"
const createInstance: (config: AxiosRequestConfig) => AxiosStatic = (config) => {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context) // 将实例指向原型上的request。由于request需要访问this。所以手动绑定上下文

  // 将Axios类上的原型属性和实例属性全部拷贝到instance上
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)


axios.create = (config) => {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken // 扩展CancelToken
axios.Cancel = Cancel // 扩展CancelToken
axios.isCancel = isCancel // 扩展CancelToken
// 后续调取axios(config)==>相当于是调取instance===>instance 指向Axios.prototype.request，因此相当于是调取了Axios.prototype.request
export default axios
