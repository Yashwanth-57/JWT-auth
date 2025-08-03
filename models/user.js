const mongoose = require('mongoose');
const { type } = require('os');

const userinfoschema =  new mongoose.Schema(
    {
        username : {type : String, required: true},
        password : {type : String , required: true}
    }
)
const user= mongoose.model('Usercredentials',userinfoschema);
module.exports= user;
