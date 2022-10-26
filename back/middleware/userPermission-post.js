
module.exports = (req, res, next) => {
    console.log(req.originalUrl.split('/')[3]);
    console.log(req.auth.userId);
    try{
        if(req.auth.userId == req.originalUrl.split('/')[3]){
            next();
        }  
    } catch(error){
        return res.status(400).json({error: 'Invalid request !'});
    }
};