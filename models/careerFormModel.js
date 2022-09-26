import mongoose from 'mongoose'


const careerFormSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim : true
    },
    lastName:{
        type: String,
        required: true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        trim : true
    },
    phoneNumber:{
        type: String,
        required: true,
        trim : true
    },
    position : {
        type: Array,
    },
    cover : {

        type: String
    },
    resume : {
        type: String,
    }

},{
    timestamps:true
})

const Dataset =mongoose.models.careerForms || mongoose.model('careerForms',careerFormSchema) 

export default Dataset

// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430