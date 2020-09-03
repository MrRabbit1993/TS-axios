import { AxiosRequestConfig } from "./types"
import { processHeaders } from "./helpers/headers"
import { transformRequest, transformResponse } from "./helpers/data"
const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: "application/json,text/plain,*/*"
        }
    },
    transformRequest: [function (data: any, headers: any): any {
        processHeaders(headers, data) // 处理请求头
        return transformRequest(data) // 处理请求数据
    }],
    transformResponse: [
        function (data: any): any {
            return transformResponse(data) // 处理响应
        }
    ]
}

const methodsNoData: string[] = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
    defaults.headers[method] = {}
})

const methodsWithData: string[] = ['post', 'put', 'patch']

methodsWithData.forEach(method => {// 增加默认的content-type
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults