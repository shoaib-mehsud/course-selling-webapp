import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const adminSecert = process.env.adminJWT;

function userAuthMiddleware(req,res,next){
    const userId = req.body.userId;
    const token = req.get('authToken');
    
    if(!token) return res.status(401).json({
        message: "token not found"
    });

    try{
        const decoded = jwt.verify(token,adminSecert);
        next();
    }
    catch(e){
        
    }
}