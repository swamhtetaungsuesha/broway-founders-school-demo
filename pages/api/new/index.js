import Categories from "../../../models/categoryModel"
import Posts from "../../../models/postModel";
import connectdb from "../../../config/connectdb";


connectdb();

export default async function handler(req,res){
    switch (req.method) {

        case 'GET':
            await getNews(req,res)
            break;
    }
}
class APIFeatures{
    constructor(query,queryString){
        this.query = query,
        this.queryString = queryString
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludeFields = ['page','sort','limit']
        excludeFields.forEach(el=>delete(queryObj[el]))
        

        if(queryObj.date!=='all'){
            const [m,y]=queryObj.date.split("_")
            
            this.query.find({$expr: { $and: [
                {
                  "$eq": [{"$month": "$createdAt"},m]
                },
                {
                  "$eq": [{"$year": "$createdAt"},y]
                }
            ]}
            })
        }

        this.query.find()

        return this
    }

    sorting(){
        
            this.query=this.query.sort('-createdAt')
        
        return this
    }
    paginating(){
        const page = this.queryString.page*1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip =( page - 1 )* limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}
const getNews=async(req,res)=>{
    try {
        const selectedCategory = await Categories.findOne({routerPath:"/news"})
        const features =new APIFeatures(Posts.find({category:selectedCategory._id}),req.query)
       .filtering().sorting().paginating()
        const news = await features.query
        const newsDate = await Posts.find({category:selectedCategory._id}).find().select('createdAt').sort('-createdAt')
                
        return res.json({
            msg : 'success data fetching',
            result : news.length,
            selectedCategory,
            newsDate,
            news 
        })
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

