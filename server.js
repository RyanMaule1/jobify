import 'express-async-errors'
//above line is a package that handles async errors
import * as dotenv from "dotenv"
dotenv.config();
//used for items used in development but not in production
//used for items that are recurring and need to be secure
import Express from "express";
import cookieParser from 'cookie-parser';
import morgan from "morgan"
import mongoose from "mongoose";
import cloudinary from "cloudinary"

//routes
import authRouter from "./routes/authRouter.js"
import jobRouter from "./routes/jobRouter.js"
import userRouter from "./routes/userRouter.js"
//middlewares
import errorHandlerMiddleware from './middleware/errorMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

//public
import {dirname} from "path"
import { fileURLToPath } from 'url';
import path from "path"

const app = Express();





if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    //logs the http status codes
}
//we only want to log the http status codes if we are in the development process
//not if we are in the production environment


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
//this is to set up the public url path in the browser
//it allows everyone to access the contents of our public folder by putting the name of files
//within that folder in the url to 
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(Express.static(path.resolve(__dirname, "./public")))

app.use(cookieParser())
app.use(Express.json());
//built in middleware that parses requests into json format

const port = process.env.PORT || 5100;
//port will equal something different in production then in development
//the peoccess.env.port is the value for porudciton, 5100 will be used for dev


try {
    //await because mongoose returns a promise
   await mongoose.connect(process.env.MONGOURL)
   app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
} catch (error) {
    console.log(error)
    process.exit(1)
}


app.get("/api/v1/test", (req, res) => {
   res.json({msg:"working"})
})


app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authenticateUser, userRouter)




app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})


// * means for every route
//we put this at the end so if the user requested rout doesnt match
//any of the above routes, we send back a 404 error
app.use("*", (req, res) => {
    res.status(404).json({msg: "not found"})
})
//the above gets triggered if a resource is requeted that doesnt exist

//for generic errors 
app.use(errorHandlerMiddleware) //this gets triggered if there is an error within our code for the 
//requested resource



