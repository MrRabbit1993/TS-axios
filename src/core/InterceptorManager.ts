import { RejectedFn, ResolvedFn } from "./../types"

interface Interceptor<T> {
    resolved: ResolvedFn<T>

    rejected?: RejectedFn
}
export default class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T>> | null  // 私有属性，存储拦截器  联合类型

    constructor() {
        this.interceptors = []
    }
    use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length
    }
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null
        }
    }
    forEach(fn: (interceptor: Interceptor<T>)) {

    }
}