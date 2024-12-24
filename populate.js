import { readFile } from 'fs/promises';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import jobSchema from './models/jobSchema.js';
import userSchema from './models/userSchema.js';


try {
    await mongoose.connect(process.env.MONGOURL)
    const user = await userSchema.findOne({email: "jane_doe@gmail.com"})
    const jsonJobs = JSON.parse(await readFile(new URL("./utils/mockData.json",
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