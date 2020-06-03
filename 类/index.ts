class User {
    fullName: string
    fristName: string
    lastName: string
    constructor(fristName: string, lastName: string) {
        this.fullName = `${fristName} ${lastName}`
        this.fristName = fristName
        this.lastName = lastName
    }
}

interface Person {
    fristName: string
    lastName: string
}

function getName(person: Person) {
    return `hello ${person.fristName} ${person.lastName}`
}
const user = new User('ou', "j")
console.log(user)
console.log(getName(user))