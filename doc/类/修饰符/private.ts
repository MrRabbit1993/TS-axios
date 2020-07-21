class Animal {
    private name: string
    constructor(name: string) {
        this.name = name
    }
}
const name = new Animal('dog').name //这里访问不了
console.log(name)