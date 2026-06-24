//require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import dns from "dns";
import path from "path";

dns.setServers(["8.8.8.8"]);
dotenv.config({
    path: './env'
})
connectDB();





/*
import express from "express";
const app = express();
;( async () => { //An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs automatically as soon as it is defined.
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("Error",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }
    catch(error){
        console.log("Error",error)
    }
})(); //putting semicolon at beginning is a good practice because prev code line might not have ; which might cause error
*/

//always wrap database thing in try catch or promises
//imagine database is in other continet for consistency,because retriving data may take time always use async and await
//async function always return a promise