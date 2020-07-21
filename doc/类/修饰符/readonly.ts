class Person1 {
    readonly name: string //受保护的属性 只能在本身或者子类中访问，无法外部访问
    constructor(name: string) {
        this.name = name
    }
}


class Person2 {
    constructor(readonly name: string) { // 参数属性 不建议这样写,不直观
    }
}





const per = new Person1('p') 
const per2 = new Person2('p')
console.log(per2.name)
// per2.name =1 只读 