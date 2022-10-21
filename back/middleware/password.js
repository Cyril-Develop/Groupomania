const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(15)                                   // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letter
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({error: 'Password is not strong enough ! It must contain between 8 and 15 characters, 1 uppercase letter, lowercase letters, 2 digits and no spaces.'});
    } else {
        next();
    }
};