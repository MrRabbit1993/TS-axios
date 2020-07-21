const o = {
    a: "a1",
    b: 1,
    c: true
}
const { a, b, c }: { a: string, b: number, c: boolean } = o;

function Fa(params: { a: string, b?: number }) {
    const { a, b = 100 } = params
}

type C = { a: string, b?: number }
function f1(params: C): void {

}


function f2({ a, b = 1001 } = { a: '' }): void {

}
f2({ a: "111" })//a = 111
f2()//a = '' 这里使用了默认参数