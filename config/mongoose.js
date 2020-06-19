/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

//  add the library
 const mongoose = require('mongoose');

// coonect to the databse localhost
 mongoose.connect('mongodb://localhost/contacts_list_db');

 // acquire the connection to check if it is successful
 const db = mongoose.connection;

//  error
 db.on('error', console.error.bind(console,'connection error:'));

//  up and running then  print the message 
 db.once('open', function(){
     console.log('Successfully Connected to the database');
 })