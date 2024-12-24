import { readFile } from 'fs';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import jobSchema from '/home/ryan/Desktop/jobify/models/jobSchema.js';
import userSchema from '/home/ryan/Desktop/jobify/models/userSchema.js';


try {
    await mongoose.connect(process.env.MONGOURL)
    const user = await userSchema.findOne({email: "ryan_maule@yahoo.com"})
    const jsonJobs = JSON.parse( readFile(new URL("/home/ryan/Desktop/jobify/utils/mockData.json",
    import.meta.url)));
    const jobs = jsonJobs.map(job => {
        return{...job, createdBy: user._id}
    });
    await jobSchema.deleteMany({createdBy: user._id})
    await jobSchema.create(jobs)
    console.log("Working!")
    process.exit(0)

} catch (error) {
    console.log(error)
    process.exit(1)
}