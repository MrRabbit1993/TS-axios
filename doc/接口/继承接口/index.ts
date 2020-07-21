interface Shape {
    color: string
}
interface PenStroke {
    width: number
}
//继承两个接口
interface Squer extends Shape, PenStroke {
    area: number
}

const are = {} as Squer
are.color = "red"
are.width = 10
are.area = 100