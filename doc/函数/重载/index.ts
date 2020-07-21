// 多个类型
// 一个实现
const suits = ['hearts', 'spades', 'clubs', 'diamonds']
function A(X: { suit: string, care: number }[]): number //传入一个数组类型 返回一个数字类型
function A(X: number): { suit: string, care: number }//传入一个数字类型，返回一个指定对象类型
function A(X): any {
    if (Array.isArray(X)) {
        let pickedCard = Math.floor(Math.random() * X.length)
        return pickedCard
    } else if (typeof X === 'number') {
        let pickedCard = Math.floor(X / 13)
        return { suit: suits[pickedCard], card: pickedCard / 13 }
    }
}