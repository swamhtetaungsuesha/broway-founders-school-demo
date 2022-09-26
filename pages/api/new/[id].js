import Categories from "../../../models/categoryModel"
import Posts from "../../../models/postModel";
import connectdb from "../../../config/connectdb";


connectdb();

export default async function handler(req,res){
   switch(req.method){
       case 'GET':
           await getNew(req,res)
        break;
      
   }
} 

const getNew=async(req,res)=>{
    try {
        const {id} = req.query
        const selectedCategory = await Categories.findOne({routerPath:"/news"})
        const selectedCategoryNews = await Posts.find({category:selectedCategory._id}).sort('-createdAt').limit(3).select('-content')
       const selectedNew = await Posts.findById({_id:id})
       return res.status(200).json({
           status : 'success fetching data',

           selectedCategory,
           selectedCategoryNews,
           selectedNew
       })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}