const code = "123"
class Name {
    private _name: string
    get name(): string {
        return this._name
    }
    set name(newName: string) {
        if (code && code === '123') {
            this._name = newName
        } else {
            console.log("err")
        }
    }
}
let nameClass = new Name()
nameClass.name = "hello"
if (nameClass.name) {
    console.log(nameClass.name)
}