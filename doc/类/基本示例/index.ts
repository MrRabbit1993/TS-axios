class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    gret() {
        return `hello ${this.greeting}`
    }
}

let greeter = new Greeter('world')
greeter.gret()