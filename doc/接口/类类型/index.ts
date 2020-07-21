interface DateIn { //类的实例类型
    currentDate: Date
    setTime(d: Date)
}

class DateCo implements DateIn {
    currentDate: Date
    constructor() {

    }
    setTime(d: Date) {
        this.currentDate = d
    }
}