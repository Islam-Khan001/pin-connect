// mongoose.connect('mongodb://127.0.0.1:27017/pinDB');

import dotenv from 'dotenv';
// let dotenv = require('dotenv');
dotenv.config();
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected ', mongoURI))
  .catch(err => console.error('MongoDB connection error:', mongoURI, err));


let userSchema = new mongoose.Schema({

  username : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  posts : [{

  }],
},{timestamps: true});

// module.exports =  mongoose.model('Users', userSchema);
export const User =  mongoose.model('Users', userSchema);

