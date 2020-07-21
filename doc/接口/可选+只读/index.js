function _initSquer(config) {
    var defaultRes = { color: "red", area: 100 };
    if (config.color) {
        defaultRes.color = config.color;
    }
    if (config.width) {
        defaultRes.area = config.width * config.width;
    }
    return defaultRes;
}
var point = { x: 1, y: 2 };
//point.x  = 1  报错
