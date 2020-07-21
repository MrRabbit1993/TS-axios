function ide<T>(arg: T): T {
    return arg
}

let myIde: <T>(arg: T) => T = ide //泛型函数类型
let myIde1: <U>(arg: U) => U = ide //泛型函数类型  T 和U 虽随意
let myIde2: { <U>(arg: U): U } = ide //泛型函数类型  对象字面量

interface Ger {
    <T>(arg: T): T
}
let myIde3: Ger = ide //泛型函数类型  接口


interface Ger1<T> {
    (arg: T): T
}
let myIde4: Ger1<number> = ide //泛型函数类型  类型外移