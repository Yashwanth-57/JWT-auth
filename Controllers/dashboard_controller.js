
const feedback = require('../models/feedback_data');

const getdashboard = ( req,res)=>{
    res.status(200).json({message:'', user:req.user.username});
}
const feed_back = async(req,res)=>{
  try {
    const username= req.user.username;
    console.log( 'for feed back nre user-- ' , username);
    const feedback_data=req.body.feedback_data;
    const newfeedback = new feedback({ username, feedback: feedback_data});
    await newfeedback.save();
    console.log('feedback saved succefully')
    res.status(200).json({message: ' feedback saved succfully'});
  }
  catch(error){
    console.log(` server eroor while feedbacking the data from client`)
    res.status(500).json({message: 'server error'});
  }

}
module.exports = { getdashboard , feed_back};