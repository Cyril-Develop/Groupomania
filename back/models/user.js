
class User {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
        this.lastname = user.lastname;
        this.firstname = user.firstname;
        this.role = user.role;
        this.imageUrl = "http://localhost:3000/images/profilePictures/defaultPicture.jpg";
    }
};

module.exports = User;