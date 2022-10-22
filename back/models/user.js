
class User {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
        this.lastname = user.lastname;
        this.name = user.name;
        this.isAdmin = user.isAdmin;
    }
};

module.exports = User;