
module.exports = (req, res, next) => {
    try{
        if(req.auth.userId == req.params.id || result != 0){
            next();
        }  
    } catch(error){
        res.status(401).json({error: 'Invalid request !'});
    }
};