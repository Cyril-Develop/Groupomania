
module.exports = (req, res, next) => {
    try{
        if(result != 0 || req.auth.userId == req.originalUrl.split('/')[3]){
            next();
        }  
    } catch(error){
        return res.status(400).json({error: 'Invalid request !'});
    }
};