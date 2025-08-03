
const express = require('express');
const Router = express.Router();
const dashboard_controller = require('../Controllers/dashboard_controller');
const authmiddleware = require('../Middlewares/authemiddlewares')

Router.get('/getdashboard', authmiddleware.authenctication , authmiddleware.tokenblacklist, dashboard_controller.getdashboard )
Router.post('/feedback', authmiddleware.authenctication, authmiddleware.tokenblacklist, dashboard_controller.feed_back);

module.exports= Router;