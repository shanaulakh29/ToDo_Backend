const jwt=require("jsonwebtoken")
const { usersArray }=require("../data/data")

const SECRET_KEY = "My_SECRET_KEY_123"

/**
 * The function checks username and password with the predefined usersArray and returns a JWT if valid
 * Token lasts 24 hours and includes user id and username
 * Returns 400 if username or password is missing, 401 if credentials are invalid
 */
const loginUser = (req,res)=>{
    if(!req.body || !req.body.username || !req.body.password){
            return res.status(400).json({message:"Username and passowrd are required"})
        }
        const {username, password} = req.body
        const user = usersArray.find( user => {
            if(user.username === username && user.password === password){
                return user
            }
        })
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const payload = {
            id:user.id,
            username: user.username
        }
    
        const accessToken = jwt.sign(payload, SECRET_KEY,{expiresIn:"24h"})
        res.json({accessToken:accessToken})
}

module.exports={loginUser}