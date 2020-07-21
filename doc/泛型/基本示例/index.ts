//使得返回类型和参数类型相同，使用类型变量，只用于表示类型，不用于值

function ide(arg: number): number {
    return arg
}

//转换为 这里的T就是一个类型变量，
// 参数和返回值都指向一个类型。。即用户传入的类型。。比如上面就指向用户传入的number类型
function ied1<T>(arg: T): T {
    return arg
}

let ouput = ied1<string>('myString')//这里明确T为string类型
let ouput1 = ied1('myString')//这里使用类型推论 推论T为string类型