interface Person {
    fristName: string
    lastName: string
}

function gree(person: Person) {
    return `lello ${person.fristName} ${person.lastName}`
}
let name2 = {
    fristName:"ou",
    lastName:"j"
}
const user = gree(name2)
console.log(user)