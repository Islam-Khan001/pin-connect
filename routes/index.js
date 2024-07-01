// var express = require('express');
// // var router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../db/users');
// const passport = require('passport');

// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// const session = require('express-session');
// const flash = require('connect-flash');
// const logger = require('morgan');

//last screenshot of the previous version


import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import {User} from '../models/users.model.js'; // Make sure your module supports ES6 imports
import logger from 'morgan';


const router = express.Router();
const app = express();

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : 'sohellofromtheotherside'
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, '../public')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


/* GET home page. */
app.get('/', async function(req, res) {
  // res.render('index', { title: 'Express' });
  res.render('top');
});

app.get('/users', async (req, res) => {
  const allusers = await User.find().select("-password");
  res.send(allusers);
});

// passport.use(new localStrategy (
//   async function (username, password, done){
//     const user = await User.findOne({ username : username });
    
//     if(!user){
//       return done(null,false, {message : 'username not found check again'});
//       // return res.status(400).json({message : 'Username not found '});

//     }
//     else{
//       try {
//         if (await bcrypt.compare(password, user.password)) {
//           return done(null, user, {message : 'userfound'});

//         }
//         else{
//           return done(null,false, {message : 'wrong password'});
//         }
//       }
//       catch(error){
//         return done (error);
//       }      
//     }
//   }
// ));



// passport.serializeUser((user,done) => {
//   done(null,user.id);
// });

// passport.deserializeUser((id,done) => {
//   try{
//     const user = User.findById(id);
//     done (null, user);
//   }
//   catch(error){
//     done(error);
//   }
// });

app.get('/profile', async (req,res) => {
  res.render('profile');
  console.log(req.header);
});

app.post('/failed', async (req,res) =>{
  res.send('login failed');
});


app.post('/signup', async (req, res) => {
  console.log("ran signup");
  const { username, email, password } = req.body;    
  const lowerCaseUsername = username.toLowerCase();
  let checkExistingUser = await User.findOne({ username : lowerCaseUsername});
  const lowerCaseEmail = email.toLowerCase();
  let checkExistingEmail = await User.findOne({ email : lowerCaseEmail});


  console.log(username, password, email);

  
  if(checkExistingUser){
    return res.status(400).json({message : 'Username Already exists '});
  }
  else if (checkExistingEmail){
    res.status(401).json({ message : 'Email already exists'});
  }
  else{
    try{
      const hashedPassword = await bcrypt.hash(password,10);
      // const hashedPassword = password;
      console.log("signup ruunning");
      const newUser = await User.create ({
        username: lowerCaseUsername,
        email: lowerCaseEmail,
        password: hashedPassword
      });
      // await newUser.save();
      // res.send({ newUser, message : 'Account created'});
      // res.redirect('/profile');
      res.status(201).json({ message : 'Account Created'});
      console.log("user created")


      // 
    }
    catch(error){
      console.log("signup not  ruunning error - ", error);

      // res.send({error, message : 'try again'});
    }
  }
});

// router.post('/', passport.authenticate('local', {
//   successRedirect : '/profile',
//   failureRedirect : '/failed'
// }));

app.post('/login', async (req, res) => {
  const { username , password} = req.body;  
  const user = await User.findOne({ username : username});
  if(!user){
    return res.status(400).json({ message : 'user not found'});
  }
  else{
    // why the fuck this exception handling have to tag along with every single piece of code
    try {
      if (await bcrypt.compare(password, user.password)) {
        // passport.isAuthenticated = true;
        passport.serializeUser((user,done) => {
          done(null,user.id);
        });
        
        passport.deserializeUser((id,done) => {
          // Oh just fucking kill me !!!!!!!!
          try{
            const user = User.findById(id);
            done (null, user);
          }
          catch(error){
            done(error);
          }
        });
        return res.status(201).json({ message : 'user found'});
      }
      else{
        return res.status(401).json({ message : 'wrong password'});
      }
    }
    catch(error){
      return error;
    }      
  }  
});

// router.post('/', (req, res ) => {
  
// passport.use(new localStrategy (
//   async function (username, password, done){
//     const user = await User.findOne({ username : username });
    
//     if(!user){
//       // return done(null,false, {message : 'username not found check again'});
//       return res.status(400).json({message : 'Username not found '});

//     }
//     else{
//       try {
//         if (await bcrypt.compare(password, user.password)) {
//           return done(null, user, {message : 'userfound'});

//         }
//         else{
//           return done(null,false, {message : 'wrong password'});
//         }
//       }
//       catch(error){
//         return done (error);
//       }      
//     }
//   }
// ));

// });


// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//     if (!user) {
//       return res.status(400).json({ message: 'Username or password is incorrect' });
//     }
//     req.logIn(user, function(err) {
//       if (err) {
//         return res.status(500).json({ message: 'Error logging in' });
//       }
//       return res.status(200).json({ message: 'Successfully logged in' });
//     });
//   })(req, res, next);
// });


const port = 3000;

app.listen(port, ()=> {
  console.log("Server is listening on port no 3000");
})

// module.exports = router;
// export default router;
