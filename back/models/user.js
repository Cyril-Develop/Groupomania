
class User {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
        this.lastname = user.lastname;
        this.firstname = user.firstname;
        this.role = "user";
        this.imageUrl = "http://localhost:3000/images/defaultPicture.jpg";
    }
};

module.exports = User;