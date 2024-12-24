import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: "last name"
    },
    location: {
        type: String,
        default: "My City"
    }, 
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }, 
    avatar: String,
    avatarPublicId: String

})

userSchema.methods.toJSON = function() {
    let obj = this.toObject()
    //this accesses only the instance we are using the function on
    //transforms the user to an object so we can use the delete method
    delete obj.password
    return obj;
}

export default mongoose.model("user", userSchema)