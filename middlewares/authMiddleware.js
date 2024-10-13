const jwt=require('jsonwebtoken');
const authenticateToken=(req,res,next)=>
{
    const token=req.header('Authorization');
    if(!token)return res.status(403).json({error:'Unauthorized access !'});
    try{
        const verified=jwt.verify(token,'secretKey');
        req.user=verified;
        next();
    }
    catch(err)
    {
        res.status(400).json({error:'Invalid token!'});
    }

};

const authorizeAdmin=(req,res,next)=>
{
    if(req.user.role!='admin'){
        return res.status(403).json({error:'You are not an Admin!'});
    }
    next();
};
module.exports={authenticateToken,authorizeAdmin};