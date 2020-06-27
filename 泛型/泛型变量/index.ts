//这里将T作为一部份类型使用
function logIde<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}