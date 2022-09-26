import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
   title : {
       type : String,
       required : [true,'Please add title'],
       text: true,
       trim : true
   },
   sub_title : {
    type:String,
    trim:true
   },
   content : {
        type : String,
        text: true,
        trim : true
    },
    avatar: {
        type : String,
    },
    category : {
        type : mongoose.Types.ObjectId,
        ref : 'categories',
        required : true
    }
},{
    timestamps:true
})

postSchema.path('title').index({ text : true });
postSchema.path('content').index({ text : true });

const Dataset =mongoose.models.posts || mongoose.model('posts',postSchema) 

export default Dataset

