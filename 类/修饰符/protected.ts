class Person {
    protected name: string //受保护的属性 只能在本身或者子类中访问，无法外部访问
    protected constructor(name: string) {
        this.name = name
    }
}

class Zhang extends Person {
    private dep: string
    constructor(name: string, dep: string) {
        super(name)
        this.dep = dep
    }
    hello() {
        return `${this.name} work in ${this.dep}`
    }
}

const zhang = new Zhang('zhang','dev')
// zhang.name //报错   受保护的属性 只能在本身或者子类中访问，无法外部访问
zhang.hello()

// const per = new Person('p') //报错  能在本身或者子类中访问，无法外部访问