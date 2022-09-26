import Posts from "../../../models/postModel"
import Categories from "../../../models/categoryModel"
import connectdb from "../../../config/connectdb";



connectdb();

export default async function handler(req,res){
   switch(req.method){
       case 'GET':
           await getItem(req,res)
        break;
      
   }
} 

const getItem=async(req,res)=>{
    try {
        const {id} = req.query
        const selectedCategory = await Categories.findOne({routerPath:`/leadership`})
       const item = await Posts.findById({_id : id})

       return res.status(200).json({
           status : 'success fetching data',
           selectedCategory,
           item
       })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}