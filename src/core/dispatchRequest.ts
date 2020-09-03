
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { buildURL } from '../helpers/url'

// import { transformRequest, transformResponse } from '../helpers/data'

// import { processHeaders, flattenHeaders } from '../helpers/headers'
import { flattenHeaders } from '../helpers/headers'

import transform from "./transform"

import xhr from './xhr'


const processConfig: (config: AxiosRequestConfig) => void = config => {
    config.url = transformURL(config)
    // config.headers = transformHeaders(config)
    // config.data = transformRequestData(config)
    config.data = transform(config.data, config.headers, config.transformRequest)
    config.headers = flattenHeaders(config.headers, config.method!) // 采取断言，这里的method在运行时一定有
}

// 转换url
const transformURL: (config: AxiosRequestConfig) => string = config => {
    const { url, params } = config

    return buildURL(url!, params) // 这里采取类型断言，断言这个url不会为空
}

// // 转换请求的data
// const transformRequestData: (config: AxiosRequestConfig) => any = config => {
//     return transformRequest(config.data)
// }

// // 转换请求头
// const transformHeaders: (config: AxiosRequestConfig) => any = config => {
//     const { headers = {}, data } = config

//     return processHeaders(headers, data)
// }

const transformResponseData: (res: AxiosResponse) => AxiosResponse = res => {
    // res.data = transformResponse(res.data)
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}


const dispatchRequest: (config: AxiosRequestConfig) => AxiosPromise = (config) => {
    processConfig(config)
    return xhr(config).then(res => transformResponseData(res))
}

export default dispatchRequest
