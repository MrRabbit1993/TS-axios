//第二个是可选参数，可选参数跟在必要参数后面
function UseName(firstName: string, lastName?: string): string {
    if (lastName) {
        return `${firstName}  ${lastName}`
    } else {
        return firstName
    }
}
let ret = UseName('ou')
let ret1 = UseName('ou', 'fish')
// let ret2 = UseName('ou','xiao','fish') //报错 ，传递了三个参数





//默认参数
function UseName1(firstName: string, lastName: string = 'hello'): string {
    return `${firstName}  ${lastName}`
}
let ret2 = UseName('ou')
let ret21 = UseName('ou', 'fish')
// let ret2 = UseName('ou','xiao','fish') //报错 ，传递了三个参数