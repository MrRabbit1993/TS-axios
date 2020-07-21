import { AxixosRequestConfig } from "./types/index"

// 创建最基本的请求发送

export default function xhr(config: AxixosRequestConfig): void {
    const { url, method = 'get', data = null } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url, true)

    request.send(data)

}