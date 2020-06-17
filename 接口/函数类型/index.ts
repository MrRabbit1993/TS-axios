//其实这个是类型推断，右侧string推断成左侧的类型
const reada = function (a: string): string {
    return a
}

//完整模式
const readb: (a: string) => string = function (a: string): string {
    return a
}

//简写模式
const readc: (a: string) => string = function (a) {
    return a
}

//接口模式

interface Func {
    (a: string): string
}
let readd: Func = function (a) {
    return a
}
const reade: Func = (a) => a
const readf: Func = (a: string): string => a