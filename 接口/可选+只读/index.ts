interface Squuer {
    color: string
    area: number
}
interface Rect {
    color?: string
    width?: number
}
function _initSquer(config: Rect): Squuer {
    let defaultRes = { color: "red", area: 100 }
    if (config.color) {
        defaultRes.color = config.color
    }
    if (config.width) {
        defaultRes.area = config.width * config.width
    }
    return defaultRes
}



interface Point {
    readonly x: number
    readonly y: number
}
const point: Point = { x: 1, y: 2 }
//point.x  = 1  报错