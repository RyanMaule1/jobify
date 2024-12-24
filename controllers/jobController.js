import jobSchema from "../models/jobSchema.js"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import day from "dayjs"
import dayjs from "dayjs"

//get all jobs
export const getAllJobs = async (req,res) => {
    //test using thunderclient querie key and value pairs
    const {search, jobStatus, jobType, sort} = req.query
    
    const queryObj = {
        createdBy: req.user.userId,


    }


    if (jobStatus && jobStatus !== "all") {
        queryObj.jobStatus = jobStatus
    }

    if (jobType && jobType !== "all") {
        queryObj.jobType = jobType
    }
    //mongo syntax, look up 
    if (search) {
        queryObj.$or = [
            {position:{$regex:search, $options: "i"}},
            {company:{$regex:search, $options: "i"}},

        ]

    }

    const sortOptions = {
        newest: "-createdAt",
        oldest: "createdAt",
        'a-z': 'position',
        'z-a': '-position',

    }

    //sort is the value passed in the query such as a-z, on the frontend
    //we haves constants for these values that we will make sure are passed here
    //when they filter
    const sortKey = sortOptions[sort] || sortOptions.newest

    //setup paginations
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    //limit is 10 items in db
    //skip will increase depending on the page

                                                //just type in prop name you want to sort
                                                // the - makes it descending order
    const jobs = await jobSchema.find(queryObj).sort(sortKey).skip(skip).limit(limit) //.sort('-createdAt')
   
    const totalJobs = await jobSchema.countDocuments(queryObj)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage:page, jobs })
}

//get single job
export const getJob = async (req, res) => {
    const {id} = req.params
    const job = await jobSchema.findById(id)

    res.status(StatusCodes.OK).json({job})
}

export const createJob = async(req, res) => {
    
    const {position, company} = req.body

    
    if (!position || !company) {
        res.status(404).json({msg: "please include company and position"})
    }

    req.body.createdBy = req.user.userId
    const job = await jobSchema.create(req.body) 

    res.status(201).json({job})
}

//editJob
export const updateJob = async (req, res) => {
    const {id} = req.params

    const job = await jobSchema.findByIdAndUpdate(id,req.body, {
        new: true// this makes is so it returns the new update job, not the job before
        //its updated
    })
    
    res.status(201).json({msg:"job successfully edited",job})
}

export const deleteJob = async (req, res) => {
    const {id} = req.params
    
    const job = await jobSchema.findByIdAndDelete(id)
   res.status(200).json({msg: "job deleted", job})
}

export const showStats = async(req, res) => {
    let stats = await jobSchema.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {_id: '$jobStatus', count: {$sum: 1}}},


    ])

    stats = stats.reduce((acc, curr) => {
        const {_id: title, count} = curr
        acc[title] = count
        return acc
    }, {})


    console.log(stats)
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplications = await jobSchema.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {
            _id: {year: {$year: '$createdAt' }, month: {$month: '$createdAt' }},
            count: {$sum: 1}
        }},
        {$sort: {'_id.year': -1, '_id.month': -1}},
        {$limit: 6}
    ])

    monthlyApplications = monthlyApplications.map(item => {
        const {_id:{year, month}, count} = item

        const date = day().month(month - 1).year(year).format('MMM YY')
        
        
        return { date, count}
    }).reverse()
    // let monthlyApplications = [{
    //     date: "may 23",
    //     count: 12
    // }, {
    //     date: "june",
    //     count: 14
    // }, {
    //     date: "july",
    //     count: 5
    // }]
    res.status(200).send({defaultStats, monthlyApplications})
}