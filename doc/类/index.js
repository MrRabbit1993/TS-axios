var User = /** @class */ (function () {
    function User(fristName, lastName) {
        this.fullName = fristName + " " + lastName;
        this.fristName = fristName;
        this.lastName = lastName;
    }
    return User;
}());
function getName(person) {
    return "hello " + person.fristName + " " + person.lastName;
}
var user = new User('ou', "j");
console.log(user);
console.log(getName(user));
