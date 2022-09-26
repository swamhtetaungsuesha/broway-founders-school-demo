import Posts from "../../../models/postModel";
import connectdb from "../../../config/connectdb";
import Categories from "../../../models/categoryModel"

connectdb();

export default async function handler(req,res){
    switch (req.method) {

        case 'GET':
            await getPhotos(req,res)
            break;
        
    }
}
class APIFeatures{
    constructor(query,queryString){
        this.query = query,
        this.queryString = queryString
    }

    sorting(){
        
            this.query=this.query.sort('-createdAt')
        
        return this
    }
    paginating(){
        const page = this.queryString.page*1 || 1
        const limit =  6
        const skip =( page - 1 )* 6

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}
const getPhotos=async(req,res)=>{
    try {
        const selectedCategory = await Categories.findOne({routerPath:"/photoGallery"})
        const features =new APIFeatures(Posts.find({category:selectedCategory._id}),req.query)
       .paginating()
        const photos = await features.query
        const allPhotosLength = await Posts.count({category:selectedCategory._id})
                
        return res.json({
            msg : 'success data fetching',
            result : photos.length,
            selectedCategory,
            photos ,
            allCount : allPhotosLength
        })
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

