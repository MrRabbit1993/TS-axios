class Point {
    static origin = { x: 0, y: 0 }  //静态属性只能用过类名访问
    scale: number
    constructor(scale: number) {
        this.scale = scale
    }
    calcPoint(point: { x: number; y: number }) {
        const xDis = point.x - Point.origin.x
        const yDis = point.y - Point.origin.y
        return Math.sqrt(xDis * xDis + yDis * yDis)
    }
}
const point = new Point(1)
point.calcPoint({ x: 3, y: 4 })