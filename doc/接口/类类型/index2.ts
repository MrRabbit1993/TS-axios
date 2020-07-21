interface InstaceFace {//实例接口
    setTime(): void
}
interface CtorFace {//构造器接口 包含静态属性
    new(hour: number, min: number): InstaceFace //执行new 后会得到一个实例的类型
}
//创建一个工场函数来实例类
function CreateClock(ctor: CtorFace, hour: number, min: number): InstaceFace {
    return new ctor(hour, min)
}

class DigClock implements InstaceFace {
    constructor() {

    }
    setTime() {
        console.log("设置时间")
    }
}

class AnaClock implements InstaceFace {
    constructor() {

    }
    setTime() {
        console.log("设置时间2")
    }
}

const digclock = CreateClock(DigClock, 12, 35);
const anaClock = CreateClock(AnaClock, 11, 12)