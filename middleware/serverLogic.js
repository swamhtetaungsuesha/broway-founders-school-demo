import Categories from '../models/categoryModel'
import Posts from '../models/postModel'
import connectdb from '../config/connectdb'

connectdb();

export const getPrimary=async(routerPath)=>{
    
    
    try {
        const selectedCategory = await Categories.findOne({routerPath:routerPath})
        const items =await Posts.find({category:selectedCategory._id})


                
        return {
            selectedCategory:JSON.parse(JSON.stringify(selectedCategory)),
            items: JSON.parse(JSON.stringify(items)),
            result: JSON.parse(JSON.stringify(items)).length
        }
        
    } catch (error) {
        return {error:error.message}
    }
}

export const getFormCareerApplication = async()=>{

    try {

        const selectedCategory = await Categories.findOne({routerPath:"/careers"})
        const in_positions = await Posts.find({category:selectedCategory._id}).sort('-createdAt').select('-content')

        return {
            selectedCategory:JSON.parse(JSON.stringify(selectedCategory)),
           in_positions :JSON.parse(JSON.stringify(in_positions))
        }
        
    } catch (error) {
        return {error:error.message}
    }
}

export const getHome=async()=>{

    try {
        const newItem = await Categories.findOne({routerPath:'/news'})
        const latestNews = await Posts.find({category:newItem._id}).limit(5).sort('-createdAt')
                
        
        
        return {
            latestNews:JSON.parse(JSON.stringify(latestNews)),
           result :JSON.parse(JSON.stringify(latestNews)).length
        }
        
    } catch (error) {
        return {error:error.message}
    }
}

