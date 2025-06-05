const express= require('express');
const app=express();
const fs= require('fs');
const path=require('path');
const jwt=require('jsonwebtoken');
const { json } = require('stream/consumers');
const SecretKey='ifiovionvoin0irhnrio';
const redis=require('ioredis');

const redisClient = new redis({
    host: '127.0.0.1',
    port: 6379,
    // password: 'your_password_if_any',
  });
app.use(express.json());
app.use(express.static(path.join(__dirname , 'public')))
const port= 4000;
app.get('/',(req, res)=>{
res.send('<h2>helooooo</h2>');
})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})
app.post('/api/reg',(req,res)=>{
    const username= req.body.username;
    const password=req.body.password;
    if(!username || !password) {
        return res.status(400).json({ error: 'Username or Password cannot be empty' });
    }


    fs.readFile('./public/users.json', 'utf8', (err, data)=>{
        if(err){
           return  res.send('<h4> Error in reading file</h4>');
        }
        let users=JSON.parse(data);
        const userexist=users.find(user => user.username===username)
        if(userexist)
        {
            res.status(400).json( {error:'user name alredy exist , please register with new username'})
            return;
        }
        
        const passwordExist = users.find(user => user.password === password);
        if (passwordExist) {
            return res.status(400).json({ error: 'Password already in use, please choose a different password' });
        }



        const newuser={ username , password}
        users.push(newuser);
        fs.writeFile('./public/users.json',JSON.stringify(users,null,2),'utf8',(err)=>{
            if(err)
            {
                res.send('<h4> error in regsting the username ad password to data file</h4>');
            }
            res.json({message:' Registred Succefully , lets go and login'});
        })  
})
})

app.post('/api/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(!username || !password)
    {
        return res.status(401).json({ error: 'Username or Password cannot be empty' });
    }
    fs.readFile('./public/users.json','utf8',(err,data)=>{
        if(err)
        {
            res.send('Error is reading file');
            return;
        }
        const users=JSON.parse(data);
        const userexist=users.find(user=>user.username===username && user.password===password)
        if(userexist==null)
        {
            return res.status(400).json({ error: 'Password or username incorect, please try again' });
        }
        const token =jwt.sign({username},SecretKey,{expiresIn:'1h'})
        console.log('login successfully');
        res.json({token});

    })
})
app.get('/dashboard', (req,res)=>{

    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
 })


 const tokenblacklist= async(req,res,next)=>{
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


};


app.get('/api/dashboard', authentication , tokenblacklist,(req,res)=>{
   
    
    res.json({message:'', user:req.user});
})

function authentication(req, res,next)
{
    
    const token = req.headers['authorization']?.split(' ')[1];

    
    if(!token)
    {
        return res.status(401).json({ message: 'No token provided, please login again.' });
    }
    jwt.verify(token, SecretKey,(err, decoded)=>{
       
        if(err)
        {
            return res.status(403).json({ message: 'Invalid token, please login again.' });
        }
        
        req.user=decoded;
        console.log(req.user.username);
        next();
    })

}
 app.post('/api/logout',(req,res)=>{
    const token = req.headers['authorization']?.split(' ')[1];
   
    
  
    if (!token) {
      return res.status(400).json({ message: 'Token missing' });
    }
  

    redisClient.set(token , 'blacklist','EX',60*60)
    .then(()=>{
       
        res.json({message:'logiout succefully'});
    })
    .catch((err)=>{
       
        res.status(500).json({ message: 'Redis error' });
    })

 })
  app.post('/api/feedback',(req,res)=>{
    const username= req.body.username;
   // console.log(req.body);
    const feedback_data=req.body.feedback_data;
    fs.readFile('./public/users.json','utf8',(err,data)=>{
        if(err)
        {
            res.send('Error is reading file');
            return;
        }
        const users=JSON.parse(data);
        console.log('eovvnvnkldfnvoniov');
        const user = users.find(u => u.username === username);
if (user) {
    console.log('iiiiiiiii');
  user.feedback = feedback_data;
  fs.writeFile('./public/users.json',JSON.stringify(users,null,2),'utf8',(err)=>{
    if(err)
    {
        res.send('<h4> error in regsting the username ad password to data file</h4>');
    }
   return res.json({message:'Thank you for the feedback'});
})
  
} else {
  console.log("User not found.");
}
    })

  })




app.listen(port,()=>{
    
    console.log(`sever is running ${port}`);
    })