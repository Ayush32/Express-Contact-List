/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const mongoose = require('mongoose');

 const contactSchema = new mongoose.Schema({
     name:{
         type:String,
         required: true
     },
     phone:{
         type: String,
         required: true
     },
 });

 const Contact = mongoose.model('contact', contactSchema);

 module.exports = Contact;
 