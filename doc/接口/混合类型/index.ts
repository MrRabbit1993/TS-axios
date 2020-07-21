interface Counter {
    (start: number): string
    interval: number
    setNum(): void
}

function getCounter(): Counter {
    let counter = (function (start: number) {

    }) as Counter //直接断言成 Counter类型
    counter.interval = 10
    counter.setNum = () => {

    }
    return counter
}

const c1 = getCounter()
c1(10)
console.log(c1.interval)