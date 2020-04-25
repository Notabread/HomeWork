export default class User {

    constructor(name, birthDate) {
        this._name = name;
        this._birthDate = birthDate;
        this._currentDate = new Date();
        this.isDead = false;
    }

    get age() {
        return this._currentDate.getFullYear() - this._birthDate.getFullYear();
    }

    get name() {
        return this._name;
    }
}