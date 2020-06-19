/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */

const express = require("express");
const path = require("path");
const port = 8000;

// require mongodb database
const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

// set template Engine

app.set("view engine", "ejs");
//  Join the path from views
app.set("views", path.join(__dirname, "views"));
// middleware function
app.use(express.urlencoded());

// Adding Static Files

app.use(express.static('assets'))

// middleware-1

// app.use(function (req,res,next) { 
//     console.log('Middleware-1 called');
//     next();
//  })

// middleware-2
// app.use(function (req, res, next) {
//   console.log("Middleware-2 called");
//   next();
// });



var contactList = [
    {
        name:"Ayush",
        phone:9554625810
    },
    {
        name:"Sushant",
        phone:9362922462
    },
    {
        name:"Karan",
        phone:9364535662
    },

]

app.get("/", function (req, res) {
    //  console.log(__dirname)
    //  res.send("<h1>Cool It's Works</h1>");

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in Fetching From Db:')
            return;
        }
         return res.render('home', {
           titleName: "Contact List",
           contact_List: contacts,
         });
    });
   
});


// app.get("/practice", function (req, res) {
//     return res.render("practice", {
//         titleName: "Let us play with ejs",
//     });
// });

app.post("/create-contact", function (req, res) {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);
    // push into the database

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
           console.log('Error in Creating a Contact!!');
           return; 
        }

        console.log('Hurray!!', newContact);
        res.redirect('back');
    });
    // return res.redirect('back');
});

// deleting contact

app.get('/delete-contact/',function(req,res){
    console.log(req.query);

    // get the query from url
    // let phone = req.query.phone;

    // get the id fro the database
    let id  = req.query.id;
    
    //  find the index
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if the index is not found.
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // find the contact in the database using id and delete

    Contact.findByIdAndDelete(id,function(err,){
        if(err){
            console.log('Error In deleting the object from the database');
            return ;
        }
        return res.redirect("back");
    });

    

});



//  app.get('/about',function (req,res) {
//      res.send("<h1>I am using Express.js for making Basic Contact List App");

//  });

app.listen(port, function (error) {
    if (error) {
        console.log("Error in running the server", error);
    }
    else{
    console.log("My Express server are running on port", port);
    }
});