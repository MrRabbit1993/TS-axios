import { AxiosRequestConfig } from "./types"

const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: "application/json,text/plain,*/*"
        }
    }
}

const methodsNoData: string[] = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
    defaults.headers[method] = {}
})

const methodsWithData: string[] = ['post', 'put', 'patch']

methodsWithData.forEach(method => {// 增加默认的content-type
    defaults.headers[method] = {
        'Content-Type': 'application/x-wwww-form-urlencoded'
    }
})

export default defaults