//案例1 使用instanceof判断
class Bire {
    fly() {
        console.log("fly")
    }
    egg() {
        console.log("bird egg")
    }
}
class Fish {
    swim() {
        console.log("swim")
    }
    egg() {
        console.log("swim egg")
    }
}

function getIntance(): Fish | Bire {
    return Math.random() > 0.5 ? new Fish() : new Bire()
}
const instance_ = getIntance();
if (instance_ instanceof Fish) {
    instance_.swim()
} else {
    instance_.fly()
}
// 案例2
interface Bire {
    fly()
    egg()
}
interface Fish {
    swim()
    egg()
}
function getPet(): Fish | Bire {

}

function isFish(ins: Fish | Bire): ins is Fish {
    return (ins as Fish).swim !== undefined
}
function isBird(ins: Fish | Bire): ins is Bire {
    return (ins as Bire).fly !== undefined
}
const pet = getPet();
if (isBird(pet)) {
    pet.fly()
} else {
    pet.swim()
}

// 案例3 使用typeof判断
function padLef(val: string, padding: string | number) {
    if (typeof padding === "number") {
        return new Array(padding + 1).join(" ") + val
    }
    if (typeof padding === "string") {
        return padding + val
    }
    throw new Error("没有得到想要的类型")
}