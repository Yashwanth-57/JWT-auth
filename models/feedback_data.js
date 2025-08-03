const mongoose = require('mongoose');
const { type } = require('os');

const feedback =   mongoose.Schema({
    username: { type : String, required : true},
    feedback : { type : String , required : true},
    createdAt: { type: Date, default: Date.now}
})
const feedback_model= mongoose.model('feedbck_data', feedback);
module.exports = feedback_model;