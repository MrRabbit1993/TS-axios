import { AxiosTransformer } from "../types";

/**
 * @description:处理转换函数调用逻辑
 * @param {fn} 处理函数
 * @return {type}
 */
const transform: (data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]) => any = (data, headers, fns) => {
    if (!fns) return data
    if (!Array.isArray(fns)) {
        fns = [fns]
    }
    fns.forEach(fn => {
        data = fn(data, headers) // 这里将data结果当参数继续传递，形成管道式调用
    })
    return data
}
export default transform