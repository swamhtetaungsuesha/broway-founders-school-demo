import Categories from "../../../models/categoryModel"
import Posts from "../../../models/postModel";
import connectdb from "../../../config/connectdb";


connectdb();

export default async function handler(req,res){
    switch (req.method) {

        case 'GET':
            await getItems(req,res)
            break;
    }
}

const getItems=async(req,res)=>{
    try {
        const {category} = req.query
        const selectedCategory = await Categories.findOne({routerPath:`/academics/${category}`})
        const items =await Posts.find({category:selectedCategory._id})


                
        return res.json({
            msg : 'success data fetching',
            result : items.length,
            selectedCategory,
            items
        })
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}