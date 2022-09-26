import mongoose from 'mongoose'


const categorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,'Please add title'],
        text: true,
        trim : true
    },
    sub_title : {
        type : String,
        trim : true
    },
    content : {
         type : String,
         text : true,
         trim : true
     },
    isRouterCategory : {
        type : Boolean,
        required : true,
        default : false
    },
    routerPath : {
        type : String,
        unique : true
    },
     avatar: {
         type : String,
     },
     field : {
         type : String,
         enum :['about us','academics','school media','school life','admission']

     }

},{
    timestamps:true
})

categorySchema.path('title').index({ text : true });
categorySchema.path('content').index({ text : true });
const Dataset =mongoose.models.categories || mongoose.model('categories',categorySchema) 

export default Dataset
