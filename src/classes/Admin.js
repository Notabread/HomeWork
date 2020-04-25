import User from "./User";

export default class Admin extends User {

    constructor(name, birthDate) {
        super(name, birthDate);
    }

    kill(user) {
        if (typeof user !== 'object' || !user) {
            throw new TypeError('Необходимо передать объект аргументом');
        }
        if (user.__proto__ === Admin.prototype) {
            throw new Error('Недостаточно прав');
        }
        user.isDead = true;
        console.log(user.name + ' убит');
    }

}