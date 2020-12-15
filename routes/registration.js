const express = require('express');
const router = express.Router();
const userData = require('../data/users');
const xss = require('xss');

router.get("/", async (req, res) => {
  res.render('login/registration', {
    title: "Register an account"
  });
})
router.post("/", async (req, res) => {

  let { email, password, userName } = req.body;
  email = xss(email).toLowerCase();
  password = xss(password);
  userName = xss(userName);
  let error_msgs = [];
  let status = false;
  let user;

  if (!userName) {
      error_msgs.push("Must provide userName.");
    }
    
    if (!email) {
        error_msgs.push("Must provide valid email.");
    }

    if (!password) {
        error_msgs.push("Must provide valid password.")
        }
    if(error_msgs.length === 0){
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailPattern.test(email)){
                error_msgs.push("You must provide a valid email.");
            }
        if(userName<3 ||userName>16){
            error_msgs.push("Please use 3-16 characters long name.");
        }
        if(password.length<3 || password.length >16){
            error_msgs.push("Please user 3-16 characters long password.");
        }
    }
    if(error_msgs.length === 0){
        try {
            user = await userData.addUser(
                userName,
                email, 
                password
            );
        } catch (error) {
            error_msgs.push(error.message);
        }
    }
    if(error_msgs.length === 0){
        status = "true";
        if(user){
            req.session.user = user["_id"].toString();
        }
    }

    res.json({
        status: status,
        error: error_msgs
    });
});

router.get('/validateUserName/:userName', async (req, res) => {
    let userName = xss(req.params.userName);
    let status = "true";
    let error;
    let user;
    if(userName.trim().length < 3 || userName.trim().length > 16){
        res.json({
            status: "false",
            error: "Please user 3-16 characters long name."
        });
        return;
    }
    try {
        user = await userData.getUserByName(userName);
    } catch (error) {
        console.log(error);
    }

    if(user){
        status = "false";
        error = "Sorry, this user name has been registered."
    }
    res.json({
        status: status,
        error: error
    });
});

router.get('/validateUserEmail/:userEmail', async (req, res) => {
    let userEmail = xss(req.params.userEmail);
    let status = "true";
    let error;
    let user;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(userEmail)){
        res.json({
            status: "false",
            error: "Please input valid email address."
        });
        return;
    }
    try {
        user = await userData.getUserByEmail(userEmail);
    } catch (error) {
        console.log(error);
    }

    if(user){
        status = "false";
        error = "Sorry, this email has been registered."
    }
    res.json({
        status: status,
        error: error
    });
});

module.exports = router;
