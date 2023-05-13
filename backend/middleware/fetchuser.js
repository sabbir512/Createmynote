var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Tusharisaplayb$oy'

//using middleware to fetch the users. middleware will decode the JWT.
const fetchuser = (req, res, next)=>{
// Get the users for JWT token and id to req
       const token = req.header('auth-token')
        if(!token){
            res.status(401).send({error: "Please authenticate using a valid token "})
        }

        try {
            const data = jwt.verify(token, JWT_SECRET )
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({error: "Please authenticate using a valid token "})
        }


   
}


module.exports = fetchuser;