import { RejectedFn, ResolvedFn } from "./../types"

interface Interceptor<T> {
    resolved: ResolvedFn<T>

    rejected?: RejectedFn
}
export default class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T> | null>  // 私有属性，存储拦截器  联合类型

    constructor() {
        this.interceptors = []
    }
    use(resolved: ResolvedFn<T>, rejected: RejectedFn): number { // 添加拦截器
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length - 1
    }
    eject(id: number): void { // 删除拦截器
        if (this.interceptors[id]) {// 这里做拦截器的删除，（将对应的拦截器id置为null）
            this.interceptors[id] = null
        }
    }
    forEach(fn: (interceptor: Interceptor<T>) => void): void {// 便于外部访问私有属性,遍历拦截器 interceptors, 参数是fn函数 fn的参数是interceptor，类型Interceptor<T>，fn返回值void
        this.interceptors.forEach(interceptor => {// 遍历拦截器
            if (interceptor !== null) {// 存在拦截器 执行一次
                fn(interceptor)
            }
        })
    }
}