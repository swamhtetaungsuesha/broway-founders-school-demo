import Comments from "../../../models/commentModel";
import connectdb from "../../../config/connectdb";
import { validComment } from "../../../utils/valid";



connectdb();

export default async function handler(req,res){
   switch(req.method){
        case 'POST':
           await createComment(req,res)
        break;
   }
} 


const createComment=async(req,res)=>{
    try {
        const { name ,email , comment } = req.body
        
        const errmsg = await validComment(name ,email , comment)

        if(errmsg) {
            return res.status(400).json({error:errmsg})
        }

        const newComment = await new Comments({
            name, email , comment
        })

        await newComment.save()
        return res.status(201).json({
            msg: 'Thank for your comment!',

        })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
