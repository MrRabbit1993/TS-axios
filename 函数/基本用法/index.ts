function add(x: number, y: number): number {
    return x + y
}
//推断类型
let addFn = function (x: number, y: number): number {// 这里是将右边推断给左边
    return x + y
}

//完整写法
let addFun: (x: number, y: number) => number = function (x: number, y: number): number {// 
    return x + y
}
//简写模式
let addFun1: (x: number, y: number) => number = function (x, y) {// 
    return x + y
}

//ES6
//完整写法
let addFunES6: (x: number, y: number) => number = (x: number, y: number): number => x + y
//简写模式
let addFunES61: (x: number, y: number) => number = (x, y) => x + y
