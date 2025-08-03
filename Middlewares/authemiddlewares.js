  const jwt = require('jsonwebtoken');
 const redisClient = require('../Config/redis');
 const SecretKey = process.env.secreatkey;

const authenctication=( req,res,next)=>{

    const token = req.headers['authorization']?.split(' ')[1];
        if(!token)
        {
            console.log("no token provided");
            return res.status(401).json({ message: 'No token provided, please login again.' });
        }
        
        jwt.verify(token, SecretKey,(err, decoded)=>{
            if(err)
            {
                console.log('token is incorect');
                return res.status(403).json({ message: 'Invalid token, please login again.' });
            }
            req.user=decoded;
            next();
        });
}

const tokenblacklist = async (req,res,next)=>{

        try{
           const token = req.headers['authorization']?.split(' ')[1];
        if(!token)
        {
            
            return res.status(401).json({ message: 'No token provided, please login again.' });
        }
    
        const blacklist= await redisClient.get(token);
        if(blacklist){
            return res.status(401).json({message: 'token blacklisted'});
        }
        next();
    }
    
    catch (err) {
        console.error("Redis error:", err);
        res.status(500).json({ message: 'Internal server error' });
      }

}

module.exports= { authenctication, tokenblacklist}