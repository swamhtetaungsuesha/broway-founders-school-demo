import TourBookings from "../../../models/tourBookingModel";
import connectdb from "../../../config/connectdb";
import { validTourBooking } from "../../../utils/valid";



connectdb();

export default async function handler(req,res){
   switch(req.method){
        case 'POST':
           await createTourBooking(req,res)
        break;
   }
} 


const createTourBooking=async(req,res)=>{
    try {
        const { parent_first_name, parent_last_name, child_name, child_age, mobile, email, preferred_date } = req.body
        
        const errmsg = await validTourBooking(parent_first_name, parent_last_name, child_name, child_age, mobile, email, preferred_date)

        if(errmsg) {
            return res.status(400).json({error:errmsg})
        }

        const newTourBooking = await new TourBookings({
            parent_first_name, parent_last_name, child_name, child_age, mobile, email, preferred_date
        })

        await newTourBooking.save()
        return res.status(201).json({
            msg: 'Thank for your booking! We will soon contact you in email or mobile.',

        })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
