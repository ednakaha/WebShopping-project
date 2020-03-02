const express = require('express');
const LoginRouter = express.Router();
const LoginSchema = require('../models/person.model');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'hr983y498r3hf304dfg';
const globalFile = require('../global');

LoginRouter.route('/').post(function (req, res) {
  console.log('get login');
  const postData = req.body;
  console.log('postData ' + postData);
  LoginSchema.find(
    { email: postData.email, password: globalFile.saltHashPassword(postData.password) }
    , function (err, LoginD) {
      if (err) {
        console.log('400' + err);
      }
      else {
            
        if (LoginD.length > 0) {
          console.log('get login id postData' + postData.email + '-' + postData.password);

          let loginData = LoginD[0].toObject();
          const token = jwt.sign({ email: postData.email }, JWT_KEY);
      
          res.json({
            token: token,
            user: loginData,
           isAuthenticated: true,
            roleId: loginData.roleId === "2" ? true : false
          });
        }
        else {
          console.log('Wrong username or password');
          res.status(402).json('Wrong username or password');
        }
      }
    });
});

module.exports = LoginRouter;