const db= require('mongoose');

const mongoconnect = async()=>{
    try{

    
    const con= await db.connect(process.env.mongo_uri);
    console.log(`mongopse conneted succesfullu ${con}`);
    }
    catch (error){
      console.log(` Got an error ${error}`);
    }

}
module.exports= mongoconnect;
