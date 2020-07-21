interface LengthWhi {
    length: number
}
//使用 extends 继承 接口来约束T的类型
function logIdeA<T extends LengthWhi>(arg: T): T {
    console.log(arg.length)
    return arg
}

logIdeA(1) //报错
logIdeA("1")
logIdeA({ length: 1 })


// 案例2
//这里约束了输入值obj
//然后用T类型的key 来约束K(obj的key属性) 这样Key 一定在obj的属性中
function getVal<T, K extends keyof T>(obj: T, key: K) {

}
const a = { a: 1, b: 2, c: 3 }
getVal(a, 'a')
getVal(a, 'd') //这里就会报错


///类 类型 --工厂函数 
//传入一个构造器，返回一个
function createI<T>(c: { new(): T }): T {
    return new c()
}