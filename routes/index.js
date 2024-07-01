import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import bcrypt from 'bcryptjs';
import {User} from '../models/users.model.js';
import logger from 'morgan';


const router = express.Router();
const app = express();

import { fileURLToPath } from 'url';
import path from 'path';
// import { render } from 'ejs';
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : 'sohellofromtheotherside',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 }
  // cookie: { maxAge: 1000 * 60 }
}));

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', async function(req, res) {
  // res.render('index', { title: 'Express' });
  res.render('top');
});

app.get('/users', async (req, res) => {
  const allusers = await User.find().select("-password");
  res.send(allusers);
});



app.get('/profile', ensureAuthenticated ,(req,res) => {
  res.render('profile');

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
      console.log("signup ruunning");
      const newUser = await User.create ({
        username: lowerCaseUsername,
        email: lowerCaseEmail,
        password: hashedPassword
      });
      // await newUser.save();
      // res.send({ newUser, message : 'Account created'});
      // res.redirect('/profile');
      const user = await User.findOne({ username : username});
      // console.log("user this : ", user);

      req.session.userId = user._id;
      res.status(201).json({ message : 'Account Created'});
      console.log("user created")
      // isAuthenticated = true;
      
    }
    catch(error){
      console.log("signup not  ruunning error - ", error);
      // res.send({error, message : 'try again'});
    }
  }
});

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

        req.session.userId = user._id;
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


const port = 3000;

app.listen(port, ()=> {
  console.log("Server is listening on port no 3000");
})

// module.exports = router;
// export default router;
