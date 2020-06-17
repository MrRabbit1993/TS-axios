interface Squuer {
    color: string
    area: number
}
interface Rect {
    color?: string
    width?: number
    [propName: string]: any
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
_initSquer({ co1: "Red", width: 1000 })