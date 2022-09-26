import Enrollments from "../../../models/enrollmentModel";
import connectdb from "../../../config/connectdb";
import { validateEnrollmentForm, validTourBooking } from "../../../utils/valid";



connectdb();

export default async function handler(req,res){
   switch(req.method){
        case 'POST':
           await createEnrollmentForm(req,res)
        break;
   }
} 


const createEnrollmentForm=async(req,res)=>{
    try {
        const { primary,secondary,child,hasSiblingStudying } = req.body
        
        const errmsg = await validateEnrollmentForm(primary,secondary,child)

        if(errmsg) {
            return res.status(400).json({error:errmsg})
        }

        const newEnrollment = await new Enrollments({
            primary,secondary,child,hasSiblingStudying
        })

        await newEnrollment.save()
        return res.status(201).json({
            msg: 'Success applying! You will be one of our own.',

        })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
