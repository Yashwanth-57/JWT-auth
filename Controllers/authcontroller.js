const user = require('../models/user');
const bcryptjs= require('../node_modules/bcryptjs/umd');
const jwt = require('jsonwebtoken');
const redisClient= require('../Config/redis')
const secreatkey= process.env.secreatkey;

const register = async( req, res)=>{
   
    try{
        const { username, password} = req.body;
        
        const existingusername = await user.findOne({username});
        if(existingusername)
        {
            console.log(`user name alredy existed ${username}`);
            return res.status(400).json( {message: 'User_name alredy exist'});
        }
        const hashedpassword = await bcryptjs.hash(password,10);
        const name = username;

        const  newuser=  new user({username : name, password:hashedpassword});
        console.log( ` new user for registsration going to  be saved in db..... ${newuser}`);
        await newuser.save();
        console.log(` saved in db successfully`);
       return res.status(200).json({message:'register successfully'});

    }
    catch(error){
        console.log(' sever error while registrataion', error.message, error.stack);
       return res.status(500).json({message: ' server error'});
    }
}

const login = async( req, res)=>{
    try{
    const {username, password} = req.body;
    const userdoc = await user.findOne({username});
     
    if(!userdoc)
    {
        console.log( 'invalid crdentials ', userdoc);
        return res.status(400).json({message:'invalid crendentials'});
    }

    const originalpassword = userdoc.password;
    const ismatch= await bcryptjs.compare(password, originalpassword);

        if(!ismatch)
        {
            console.log('inccorect password');
            return res.status(400).json({message:'incoorect password'});
        }

        
        const token =  jwt.sign({username }, secreatkey, {expiresIn : '1h'});
        res.json({token});
}
    catch (error){
        console.log( ' token geraanarating problem  not genrarted token ', error);
       return  res.status(500).json({message:' server error'})
    }
}

const logout =(req,res)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        console.log( token , 'token is missing in while logouting , cannot logout')
      return res.status(400).json({ message: 'Token missing' });
    }
    console.log('ooooo');
        redisClient.set(token , 'blacklist','EX',60*60)
    .then(()=>{
           console.log('sucessfully token black listed ', token);
        return res.status(200).json({message:'logoout succefully'});
    })
    .catch((err)=>{
           console.log('redis error , cannot logout , token not black listing', token);
        return res.status(500).json({ message: 'Redis error' });
    })

}

module.exports = {register, login, logout};