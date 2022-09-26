import Categories from "../../../models/categoryModel"
import Posts from "../../../models/postModel";
import connectdb from "../../../config/connectdb";

connectdb();

export default async function handler(req,res){
   switch(req.method){
       case 'GET':
           await getMenuCategories(req,res)
        break;
      
   }
} 

const getMenuCategories=async(req,res)=>{
    try {
        const Arr = []
        const categories = await Categories.find()
        
        categories.forEach(category=>{
            Arr.push({_id:category,items:[]})
        })
        const postItems = await Posts.aggregate([
            
            {
              $group : { _id : "$category", items: { $push: { _id: "$_id", title: "$title",avatar: "$avatar" ,sub_title:'$sub_title',content:'$content'}} }
            }
          ])

          

          const items = await Categories.populate([...postItems],{path:"_id", select:  {title: 1,avatar:1,routerPath:1,isRouterCategory:1,field:1,content:1}})
       
           const finalItems = items.map(item=>{
            if(item._id.routerPath!=='/leadership'&&item._id.routerPath!=='/posts/events'&&item._id.routerPath!=='/posts/campus'){
              return {_id:item._id,items:[]}
            }
            return item
           })
          
          
           finalItems.push(...Arr)
           const uniqueIds = [] 
           const unique = finalItems.filter(element => {
            
            const isDuplicate = uniqueIds.includes(element._id.routerPath);
            
            if (!isDuplicate) {
              uniqueIds.push(element._id.routerPath);
          
              return true;
            }
          
            return false;
          });
          
       return res.status(200).json({
           status : 'success fetching data',
           LastItems:unique
       })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}