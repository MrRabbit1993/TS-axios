import { AxiosRequestConfig } from "./../types"
import { isPlainObject,deepMerge} from "./../helpers/util"

const strats = Object.create(null)

const defaultStrat: (val1: any, val2: any) => any = (val1, val2) => {
    return typeof val2 !== 'undefined' ? val2 : val1
}

const formVal2Strat: (val1: any, val2: any) => any = (val1, val2) => {
    return typeof val2 !== 'undefined' ? val2 : null
}

const stratKeyFromVal: string[] = ['url', 'params', 'data']

stratKeyFromVal.forEach(key => {
    strats[key] = formVal2Strat
})

const deepMergeStrat: (val1: any, val2: any) => any = (val1, val2) => {
    if (isPlainObject(val2)) { // 如果是对象
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {// 表示有值,但不是对象
        return val2
    } else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else if (typeof val1 !== 'undefined') {
        return val1
    }
}

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
    strats[key] = deepMergeStrat
})

const mergeConfig: (defaultConfig: AxiosRequestConfig, customConfig?: AxiosRequestConfig) => AxiosRequestConfig = (defaultConfig, customConfig) => {
    if (!customConfig) { customConfig = {} }
    const config = Object.create(null) // {}

    const mergeField: (key: string) => void = (key) => {
        const strat = strats[key] || defaultStrat // 通过key拿到对应的合并函数
        config[key] = strat(defaultConfig[key], customConfig![key]) // 这里使用类型断言，断言customConfig 不是空
    }

    for (let key in customConfig) {
        mergeField(key)
    }

    for (let key in defaultConfig) {

        (!customConfig[key]) && mergeField(key) // 不在自定义里面才加入
    }


    return config
}

export default mergeConfig