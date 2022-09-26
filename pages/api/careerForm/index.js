import CareerForms from "../../../models/careerFormModel";
import connectdb from "../../../config/connectdb";
import { validCareer } from "../../../utils/valid";



connectdb();

export default async function handler(req,res){
   switch(req.method){
        case 'POST':
           await createCareerForm(req,res)
        break;
   }
} 


const createCareerForm=async(req,res)=>{
    try {
        const {firstName,lastName,email,phone,position ,cover ,resume } = req.body
        
        const errmsg = await validCareer(firstName,lastName,email,phone)

        if(errmsg) {
            return res.status(400).json({error:errmsg})
        }

        const newCareerForm = await new CareerForms({
            firstName,lastName,email,phoneNumber : phone ,position,cover,resume
        })

        await newCareerForm.save()
        return res.status(201).json({
            msg: 'Thank for your applying!',

        })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
