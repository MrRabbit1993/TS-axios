class GenNum<T>{
    zeroNum: T
    add: (x: T, y: T) => T
}
const _instance = new GenNum<number>()
_instance.zeroNum = 1
_instance.add = (x, y) => x + y
const __instance = new GenNum<string>()
__instance.zeroNum = "1"
__instance.add = (x, y) => `${x}-${y}`