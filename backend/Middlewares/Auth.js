const jwt= require('jsonwebtoken');

const ensureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403).json({
            message:'unauthorized,jwt token required'

        })
    }
    try{
        const decoded=jwt.verify(auth,'Secret-123');
        req.user=decoded;
        next();
        

    }
    catch(err){
        return res.status(403).json({
            message:'unauthorized,jwt token is invalid or expired'

        })
    }

}
module.exports=ensureAuthenticated;
