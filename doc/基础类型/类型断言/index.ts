let someValue: any = "a b c"
//方案一
let strLength: number = (<string>someValue).length
//方案二
let stringLength2: number = (someValue as string).length
// 建议使用as 语法
//jsx里面只能使用as