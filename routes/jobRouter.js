import { Router } from "express";

const router = Router();

import {createJob, getJob, getAllJobs, updateJob, deleteJob, showStats
} from "../controllers/jobController.js"// always add the .js when not in react
import { validateJobInput, validateIdParamater } from "../middleware/validationMiddleWare.js";


//should create a basic CRUD with routes and coltrollers in the server file first
//then once created, we can seperate them into their own files 

router.get("/", getAllJobs)
router.get("/stats", showStats)
router.get("/:id", validateIdParamater, getJob)
router.post("/", validateJobInput, createJob)
router.patch("/:id",validateJobInput, updateJob)
router.delete("/:id", validateIdParamater, deleteJob)


// router.route("/")
// .get("/", getAllJobs)
// .post("/", createJob)

// router.route("/:id")
// .get("/:id", getJob)
// .patch("/:id", updateJob)
// .delete("/:id", deleteJob)

export default router