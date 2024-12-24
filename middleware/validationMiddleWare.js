import {body,param, validationResult} from "express-validator"
import { BadRequestError, NotFoundError, UnauthenticatedError, UnauthorizedError } from "../errors/customError.js"
import { JOB_STATUS, JOB_TYPES } from "../utils/constants.js"
import mongoose from "mongoose"
import userSchema from "../models/userSchema.js"
import jobSchema from "../models/jobSchema.js"
import { Error } from "mongoose"
//this function is in charge of controlling what values thr user enters
//the function takes one param and returns ana array of middlewares
//the array is express syntax

//validate values will contain all of the inputs we want to validate
//this function will take the values we pass in for params and return them post validation
//the second item in the array is our error response 
//the third item, our other middleware, is the controller
const withValidationError = (validateValues) => {
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req)//the errors we get from validateValues
        console.log(errors)
        if (!errors.isEmpty()) {
           const errorMessages = errors.array().map(err => err.msg)
           if (errorMessages[0].startsWith("no job")) {
                throw new NotFoundError(errorMessages)//gets us a 404 error
           }
           if (errorMessages[0].startsWith("Not authorized")) {
            throw new UnauthorizedError("Not authorized to access this route")
           }
           if (errorMessages[0].startsWith("Cast"))  {
            throw new BadRequestError('Job does not exist')
           }
           throw new BadRequestError(errorMessages)
           
        }
        next()
    }]
}

export const validateJobInput = withValidationError([
    body('company').notEmpty().withMessage("Please provide a company"),
    body('position').notEmpty().withMessage("Please provide a position"),
    body('jobLocation').notEmpty().withMessage("Please provide a location"),
    body('jobStatus').isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid status value'),
    //checks if the user input is in
    //the array of options we have in the schema for job status
    body('jobType').isIn(Object.values(JOB_TYPES))
    .withMessage('Invalid job type')
])

//param(id) allows us to access the id paramater
//.custom allows us to create our own custom validation function
export const validateIdParamater = withValidationError([
    param("id").custom(async(value, {req}) => {
       const isValid = mongoose.Types.ObjectId.isValid(value)

        const job = await jobSchema.findById(value)

        console.log(!job)
        if (!isValid) {
            throw new BadRequestError('invalid id')
        } else if (!job) {
            console.log("ERROR")
            throw new NotFoundError(`No job found with that id: ${value}`)
            
        } 
        const isAdmin = req.user.role === "admin"
        const isOwner = req.user.userId === job.createdBy.toString()

        if (!isAdmin && !isOwner) {
            throw new UnauthorizedError("Not authorized to access this route")
        }
    })
])
//figure out problem with BadrequestError

export const validateRegistrationInfo = withValidationError([
    body('firstName').notEmpty().withMessage("first name is required"),
    body('lastName').notEmpty().withMessage("last name is required"),
    body('email').notEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email format").custom(async(email) => {
        const existingEmail = await userSchema.findOne({email})
        //not sure why we need to use findOne() instead of find()
        //but find would not work
        // const check = await userSchema.find({name: "Ryan"})
        // console.log(check)
        if (existingEmail) {
            throw new BadRequestError('That email already exists')
        }
    }),
    body('password').notEmpty().withMessage('password is required').isLength({min: 8})
    .withMessage('password must be at least 8 characters'),
    body('location').notEmpty().withMessage('location cannot be empty')
])

export const validateLoginInfo = withValidationError([
    body('email').notEmpty().withMessage("Email required").isEmail().
    withMessage("Invalid email format"),
    // .custom(async email => {
    //     const checkEmail = await userSchema.findOne({email})

    //     if (!checkEmail) {
    //         throw new BadRequestError('No user exists with that email')
    //     }
    // }),
    body('password').notEmpty().withMessage("password required")
    //we check for the correct password and if the email exists in the controller
])


export const validateUpdatedUserInput = withValidationError([
    body('First Name').notEmpty().withMessage("first name is required"),
    body('Last Name').notEmpty().withMessage("last name is required"),
    body('Email').notEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email format").custom(async(email,{req}) => {
        const existingEmail = await userSchema.findOne({email})
        //not sure why we need to use findOne() instead of find()
        //but find would not work
        // const check = await userSchema.find({name: "Ryan"})
        // console.log(check)
        if (existingEmail && existingEmail._id.toString() !== req.user.userId) {
            //this if statement prevents the user from updating with the same email 
            throw new BadRequestError('That email already exists')
        }
    }),body('Location').notEmpty().withMessage('location cannot be empty')
])