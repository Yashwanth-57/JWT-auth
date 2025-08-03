
const express= require('express');
const authcontroll= require('../Controllers/authcontroller');
const Router = express.Router();

Router.post('/register',authcontroll.register);
Router.post('/login', authcontroll.login);
Router.post('/logout', authcontroll.logout);

module.exports= Router;