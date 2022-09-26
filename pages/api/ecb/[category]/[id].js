import Posts from "../../../../models/postModel"
import Categories from "../../../../models/categoryModel"
import connectdb from "../../../../config/connectdb";



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
        const {category,id} = req.query
        const selectedCategory = await Categories.findOne({routerPath:`/posts/${category}`})
        const nextItem = await Posts.find({category:selectedCategory._id,_id: {$gt: id}}).sort({_id: 1 }).limit(1)
       const currentItem = await Posts.findById({_id : id})
       const prevItem = await Posts.find({category:selectedCategory._id,_id: {$lt: id}}).sort({_id: -1 }).limit(1)
       
       return res.status(200).json({
           status : 'success fetching data',
           selectedCategory,
           nextItem:nextItem.length!==0&&nextItem[0],
           currentItem,
           prevItem:prevItem.length!==0&&prevItem[0]
       })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}