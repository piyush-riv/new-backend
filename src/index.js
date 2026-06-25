//require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import dns from "dns";
import path from "path";
import { error } from "console";
import { app } from "./app.js";
dns.setServers(["8.8.8.8"]);
dotenv.config({
    path: './env'
})

//had error in dns nodejs windows problem explain

const startServer = async () => {
    try {
        await connectDB(); // async function always returns promise await waits fort the promise
        const PORT = process.env.PORT || 3000;
        const server = app.listen( PORT, () => { //returns a http server object
            console.log(`Server is running at port ${process.env.PORT || 8000}`);
        });
        server.on("error",(error) => {
            console.error("Server error",error);
            process.exit(1);
        });

    } 
    catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
startServer();



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
//app.use() is used while using middleware/configuration settings
