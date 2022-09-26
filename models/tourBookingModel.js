import mongoose from 'mongoose'


const tourBookingSchema = new mongoose.Schema({
    parent_first_name:{
        type: String,
        required: true,
        trim : true
    },
    parent_last_name:{
        type: String,
        required: true,
        trim : true
    },
    child_name:{
        type: String,
        required: true,
        trim : true
    },
    child_age:{
        type: String,
        required: true,
        trim : true
    },
    mobile : {
        type: String,
        required: true,
        trim : true
    },
    email : {

        type: String,
        required: true,
        trim : true
    },
    preferred_date : {
        type: String,
        required: true,
        trim : true
    }

},{
    timestamps:true
})

const Dataset =mongoose.models.tourBookings || mongoose.model('tourBookings',tourBookingSchema) 

export default Dataset

// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430