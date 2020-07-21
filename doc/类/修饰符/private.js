var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var name = new Animal('dog').name;
console.log(name);
