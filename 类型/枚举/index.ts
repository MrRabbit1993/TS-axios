enum Color {//从0开始
    Red,
    Green,
    Blue
}

const c : Color = Color.Blue
console.log(c)
console.log(Color)

//枚举编号
enum Color1 { //从1 开始
    Red =1,
    Green,
    Blue
}
const c1: Color1 = Color1.Blue
console.log(c1)
console.log(Color1)

//枚举编号
enum Color2 { //从1 开始
    Red =1,
    Green = 4,
    Blue
}
const c2: Color2= Color2.Blue
console.log(c2)
console.log(Color2)