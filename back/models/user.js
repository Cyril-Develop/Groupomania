const mysql = require("mysql");

//Constructeur
class User {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
    }
}

module.exports = User;