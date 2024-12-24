import userSchema from "../models/userSchema.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword, checkPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJwt } from "../utils/tokenUtils.js";

export const register = async(req, res) => {
    //sets the role to admin if the user is the first to register
    const checkUser = await userSchema.count() === 0

    req.body.role = checkUser ? 'admin' : 'user'

   req.body.password = await hashPassword(req.body.password)

    const user = await userSchema.create(req.body)

    res.status(StatusCodes.CREATED).json({msg: 'new user registered'})
}

export const login = async(req, res) => {

    const {email, password} = req.body
    
    const user = await userSchema.findOne({email: email})
   //checking if their is an email that matches the request
    if (!user) {
        throw new UnauthenticatedError("No user exists with that email")
    }


   const passwordMatchBool = await checkPassword(password, user.password)
//now checking if the requested password matches the password of the user with the 
//email requested


   if (!passwordMatchBool) {
    throw new UnauthenticatedError("password does not match")
   }  
   
   //_id is the name of the property not just id
   const token = createJwt({userId:user._id, role:user.role})
   console.log(token)
   const oneDay = 1000*60*60*24
   //converts milliseconds to one day 


   res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    
   })//basically sends the still encrypted jwt token back to the server, when a user
   //logs in

   //look at video 101 in mern course, server section
   
   res.status(200).json("User logged in")
}


export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(200).json({msg: "succesfully logged out"})
}