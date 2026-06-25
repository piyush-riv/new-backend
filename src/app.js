import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true //can add more
}))

app.use(express.json({
    limit:"16kb"
})) //for json data

app.use(express.urlencoded({extended:true,limit:"16kb"}))
//for url

app.use(express.static("public"))


app.use(cookieParser())

//routes

import userRouter from './routes/user.routes.js'


//routes declartion
//we used to do app.get() and everything used to work, it used to work because we do routes and controller in one single file
//because everything is seperated now the format is :-
//app.use("/users",userRouter)


app.use("/api/v1/users",userRouter)

//http://localhost:8000/api/v1/users/register

export {app}

