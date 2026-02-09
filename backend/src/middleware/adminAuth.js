import jwt from 'jsonwebtoken';
const adminSecert = process.env.adminJWT;

function adminAuthMiddleware(req,res,next){
    const token = req.get('Authorization');
    
    if(!token) return res.status(401).json({
        message: "token not found"
    });

    try{
        const decoded = jwt.verify(token,adminSecert);
console.log("Middleware decoded ID:", decoded.id || decoded.Id);        if(decoded){
            req.userid = decoded.id;
             next()
        }

    }
    catch(e){
        res.status(403).json({
            message: "invalid token"
        })
    }
}

export default adminAuthMiddleware;