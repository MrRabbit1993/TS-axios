//多个类型合并城一个类型
function _extend_<T, U>(first: T, second: U): T & U {
    const result = {} as T & U //先断言成交叉类型
    for (let key in first) {
        result[key] = first[key] as any
    }
    for (let key in second) {
        if (!result.hasOwnProperty(key)) {
            result[key] = second[key] as any
        }
    }
    return result
}

class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }
}
interface Log {
    log(): void
}
class Logger implements Log {
    log() {
        console.log(1)
    }
}
const a_ = _extend_(new Person("hi"), new Logger())
//这里a 就会有 name 和 log
