require('dotenv').config();
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app=express();
const db=require('./db');
const userController=require('./Controllers/userController');
const issueController=require('./Controllers/issueController');



app.use(morgan('dev'));
app.use(cors());
app.use('/',userController);
app.use('/',issueController);


app.listen(process.env.PORT)