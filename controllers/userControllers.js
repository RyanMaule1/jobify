import userSchema from "../models/userSchema.js"
import jobSchema from "../models/jobSchema.js"
import cloudinary from "cloudinary"
import {promises as fs} from "fs"

export const getCurrentUser = async(req,res) => {
    const userId = req.user.userId

    const user = await userSchema.findOne({_id: userId})
    console.log(user)
    const userWithoutPassword = user.toJSON()

    if (!user) {
        res.json({msg: "not working"})
    }

    res.status(200).json({user: userWithoutPassword})

}

export const getApplicationStats = async(req,res) => {
    const users = await userSchema.countDocuments();
    const jobs = await jobSchema.countDocuments();

    res.status(200).json({users, jobs})
}

export const updateUser = async(req,res) => {
    


    let newUser = {...req.body}
    delete newUser.password

    //check if there is a file uploaded
    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)//removes the file after we have gained access to it
                                    //in the previous line
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }
    const updatedUser = await userSchema.findByIdAndUpdate(req.user.userId, newUser)

    //if the account is trying to upload a new file and a previous file exists in their acct
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.status(200).send({msg: "user information updated"})
}