import mongoose, { Schema } from "mongoose";
import { JOB_STATUS, JOB_TYPES } from "../utils/constants.js";

const jobSchema = new Schema({
    position: {type: String,
        required: true
    },
    company: {type: String,
        required: true
    },
    jobStatus: {
        type: String,
        //enum is just for a input field
        enum: Object.values(JOB_STATUS),
        default: "pending"
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPES),
        default: "full-time"
    },
    jobLocation: {
        type: String,
        default: "my City"
    },
    
   
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    status: String,
    //look up what timestamps does 
}, {timestamps: true})

export default mongoose.model("job", jobSchema)