const express=require("express");
const app=express();
const connection = require('./database.js');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const {verifyToken}=require("./middleware.js");
const {addData,adcourse,getcourse,addmark,getmark, login} = require("./apis.js");
app.post('/added',addData);
//app.get('/findData',getdata);

app.post('/addcourse',adcourse);
app.post('/login',login);
app.get('/findcourses',getcourse);

app.post('/addmarks',addmark);
app.get('/findmarks',getmark);

app.listen("3000",()=>{
console.log ("server is listening on port 3000");
});

