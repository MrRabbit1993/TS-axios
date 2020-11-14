import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(executor: CancelExecutor) {
    // 参数是CancelExecutor类型的函数
    let resolvePromise: ResolvePromise // 生产一个临时变量，用于接收promise的resovle方法
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })
    executor(message => {
      if (this.reason) {
        //  如果有原因表示终止过了，后续就不需要在调取了
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason) // 这里调取promise的resolve
    })
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      // c 就是CancelExecutor类型的executor
      cancel = c
    })
    return { cancel, token }
  }
}
