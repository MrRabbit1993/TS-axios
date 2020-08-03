import { AxiosInstance, AxiosRequestConfig } from "./types"

import Axios from "./core/Axios"

import { extend } from "./helpers/util"

import defaults from "./default"

const createInstance: (config: AxiosRequestConfig) => AxiosInstance = (config) => {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context) // 将实例指向原型上的request。由于request需要访问this。所以手动绑定上下文

  // 将Axios类上的原型属性和实例属性全部拷贝到instance上
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)


// 后续调取axios(config)==>相当于是调取instance===>instance 指向Axios.prototype.request，因此相当于是调取了Axios.prototype.request
export default axios
