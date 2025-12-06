const jwt = require("jsonwebtoken")
const SECRET_KEY="My_SECRET_KEY_123"

/**
 * This middleware is used to authenticate JWT tokens from incoming requests
 * 
 * Expected format of Authorization header:
 *    Authorization: Bearer <JWT>
 *
 * It validates the presence of a token and verifies token signature and expiry
 *  
 * Responses: 
 *  1) For success scenario, the function adds the decoded payload to req.user
 *  2) For failure scenario, it will return appropriate HTTP error responses:
 *     401 for no token / expired token
 *     403 for invalid signature
 */

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }
    jwt.verify(token, SECRET_KEY,(err, user)=>{
        if(err){
            if(err.name==="TokenExpiredError"){
                return res.status(401).json({message:"Token expired"})
            }else{
                return res.status(403).json({message:"Invalid token"})
            }
        }
        req.user=user
        next()
    })
}

module.exports=authenticateToken