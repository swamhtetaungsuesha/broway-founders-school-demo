import mongoose from 'mongoose'


const commentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        trim : true
    },
    comment : {
        type: String,
        required : true
    },
    replied : {
        type : Boolean,
        default : false
    }

},{
    timestamps:true
})

const Dataset =mongoose.models.comments || mongoose.model('comments',commentSchema) 

export default Dataset

// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430