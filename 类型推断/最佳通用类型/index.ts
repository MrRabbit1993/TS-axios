let x1 = [1, 2, null]

class Animal {
    numLength: number
}

class Bee extends Animal {

}

class Lion extends Animal {

}
const ani = [new Bee(), new Lion()]//这里不能推断城Animal 类型，,呗推断为联合类型，可以手动设置为Animal类型
const ani1: Animal[] = [new Bee(), new Lion()]

