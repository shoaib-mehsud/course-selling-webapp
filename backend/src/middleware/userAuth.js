import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSecert = process.env.userJWT;

function userAuthMiddleware(req,res,next){
    const token = req.get('Authorization');
    
    if(!token) return res.status(401).json({
        message: "token not found"
    });

    try{
        const decoded = jwt.verify(token,userSecert);
        if(decoded){
            req.userid = decoded.id
        }
        next();
    }
    catch(e){
        res.status(403).json({
            message: "invalid token"
        })
    }
}

export default userAuthMiddleware;