import Categories from "../../../models/categoryModel";
import Posts from "../../../models/postModel";

import connectdb from "../../../config/connectdb";



connectdb();

export default async function handler(req,res){
   switch(req.method){
       case 'GET':
           await getProducts(req,res)
        break;

   }
} 

const getProducts=async(req,res)=>{
    try {
        let search = req.query.search
        
     
        const categories = await Categories.find( { $text: { $search: search} },
        { score:{$meta:'textScore'} })
        .sort({ score : { $meta : 'textScore' } })
        const posts = await Posts.find( { $text: { $search: search} },
            { score:{$meta:'textScore'} })
            .populate('category')
            .sort({ score : { $meta : 'textScore' } })
            const finalItems = posts.map(item=>{
     
                if(item.category.routerPath==='/photoGallery'){

                  return {}
                }else if(item.category.field==='academics'||item.category.routerPath==='/school_policies'||item.category.routerPath==='/activities'){

                    return {
                        ...item.category._doc,
                        score : item
                    }
                }else{

                    return {
                        _id:item._id,
                        title:item.title,
                        content:item.content,
                        routerPath:item.category.routerPath+'/'+item._id,
                        avatar : item.avatar||'',
                        field:item.category.field,
                        score : item
                    }
                }
                
               })
            
              const lastItems= finalItems.filter(item=>(Object.keys(item).length!==0))
       return res.status(200).json({
           status : 'success fetching data',
           result : lastItems.length,
           categories:categories,
           posts:lastItems
       })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}