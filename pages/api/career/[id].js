import Categories from "../../../models/categoryModel"
import Posts from "../../../models/postModel";
import connectdb from "../../../config/connectdb";


connectdb();

export default async function handler(req,res){
   switch(req.method){
       case 'GET':
           await getCareer(req,res)
        break;
      
   }
} 

const getCareer=async(req,res)=>{
    try {
        const {id} = req.query
        const selectedCategory = await Categories.findOne({routerPath:"/careers"})
        const selectedCategoryCareers = await Posts.find({category:selectedCategory._id}).sort('-createdAt').select('-content')
       const selectedCareer = await Posts.findById({_id:id})
       return res.status(200).json({
           status : 'success fetching data',

           selectedCategory,
           selectedCategoryCareers,
           selectedCareer
       })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}