import { Application } from "../models/Application_model.js"
import { Job } from "../models/job_model.js"

export const applyJob = async (req , res) =>{
    try {
        const userId = req.id 
        const { id} = req.params
        if(!id){
            return res.status(400).json({
                msg : "Job id is required" ,
                success : false
            })
        }
        const existingApplication = await Application.findOne({job:id , applicant:userId})

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        const job =  await Job.findById(id)

        if(!job){
            return res.status(400).json({
                msg : "You have already applied for this jobs" ,
                success : false
            })
        }

        // create a new application
        const newApplication = await Application.create({job:id , applicant:userId});

        job.applications.push(newApplication._id)

        await job.save()


        return res.status(201).json({
          msg : "Job applied successfully"  ,
          success :true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAppliedJobs  = async (req , res) =>{
    try {
        const userId = req.id 
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });

        if(!application){
            return res.status(404).json({
                msg : "Job applied successfully"  ,
                success :false
              })
        }

        return res.status(200).json({
            application ,
            success :true
          })
    } catch (error) {
        console.log(error)
    }
}

export const getApplicants = async (req , res) =>{
    try {
        const {id} = req.params
        const job = await Job.findById(id).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                msg : "Job not found" ,
                success : false
            }) }

        return res.status(200).json({
            job ,
            succees :true
        })

    } catch (error) {
        console.log(error)
    }
}

export const updateStatus = async (req , res) =>{
    try {
        const {status} = req.body
        const {id} = req.params

        if(!status){
            return res.status(404).json({
                msg : "status is required" ,
                success : false
            })
        }
        const application = await Application.findOne({_id : id})
        if(!application){
            return res.status(404).json({
                msg : "Application not found" ,
                success : false 
            })
        }

        application.status = status.toLowerCase() ;
        await application.save()

        return res.status(200).json({
            msg : "Status updated successfully" ,
            success :true
        })
       
    } catch (error) {
        console.log(error)
    }
}