const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    
.is().max(15)                                   
.has().uppercase(2)                              
.has().lowercase(3)                              
.has().symbols(1)                                
.has().digits(2)                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']); 

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({error: 'Password is not strong enough ! It must contain between 8 and 15 characters, 2 uppercase letters, 3 lowercase letters, 2 digits, 1 symbol and no spaces.'});
    } else {
        next();
    }
};