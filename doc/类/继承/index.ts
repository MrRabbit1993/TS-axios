class Animal {//基类
    name: string
    constructor(name: string) {
        this.name = name;
    }
    move(distance: number) {
        console.log(`${this.name} move ${distance}`)
    }
}

class Dog extends Animal {//派生类
    constructor(name: string) {
        super(name)
    }
    move(distance: number) {
        console.log("汪");
        super.move(distance)
    }
}
const dog: Animal = new Dog('旺财')
dog.move(10)