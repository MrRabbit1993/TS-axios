import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, ResolvedFn, RejectedFn } from "./../types"

import dispatchRequest from "./dispatchRequest"

import InterceptorManager from "./InterceptorManager"


interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectedFn
}

export default class Axios {
    interceptors: Interceptors
    constructor() {
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        }
    }
    // request(config: AxiosRequestConfig): AxiosPromise {
    //     return dispatchRequest(config)
    // }
    // 函数重载扩展请求
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') { // 对应 axios('url',config)
            if (!config) config = {}
            config.url = url
        } else {
            config = url // 对应 axios(config)
        }

        const chain: PromiseChain<any>[] = [{// 链式调用  这里用any泛型来代替 AxiosPromise或者AxiosRequestConfig
            resolved: dispatchRequest,
            rejected: undefined
        }]
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)// 请求拦截器 后添加的先执行
        })
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor) // 响应拦截器 先添加的先执行
        })

        let promise = Promise.resolve(config)

        while (chain.length) {
            const { resolved, rejected } = chain.shift()! // 这里断言不为空
            promise = promise.then(resolved, rejected)
        }

        return promise
        // return dispatchRequest(config)
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }

    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method,
            url
        }))
    }

    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
}