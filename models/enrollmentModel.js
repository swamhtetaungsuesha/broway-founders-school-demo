import mongoose from 'mongoose'


const enrollmentSchema = new mongoose.Schema({
    primary : {
        title: {
            type: String,
            required: true,
            trim : true
        },
        relation: {
            type: String,
            required: true,
            trim : true
        }, 
        first_name: {
            type: String,
            required: true,
            trim : true
        } ,
        last_name: {
            type: String,
            required: true,
            trim : true
        }, 
        email: {
            type: String,
            required: true,
            trim : true
        }, 
        mobile: {
            type: String,
            required: true,
            trim : true
        },
        country_residence: {
            type: String,
            required: true,
            trim : true
        }, 
        passport_number_id: {
            type: String,
            required: true,
            trim : true
        }, 
        local_address: {
            type: String,
            required: true,
            trim : true
        },
        notes:{
            type: String,
            trim : true
        }
    },
    secondary : {
        title: {
            type: String,
            required: true,
            trim : true
        },
        relation: {
            type: String,
            required: true,
            trim : true
        }, 
        first_name: {
            type: String,
            required: true,
            trim : true
        } ,
        last_name: {
            type: String,
            required: true,
            trim : true
        }, 
        email: {
            type: String,
            required: true,
            trim : true
        }, 
        mobile: {
            type: String,
            required: true,
            trim : true
        },
        country_residence: {
            type: String,
           
            trim : true
        }, 
        passport_number_id: {
            type: String,
           
            trim : true
        }, 
        local_address: {
            type: String,
           
            trim : true
        },
        notes:{
            type: String,
            trim : true
        }
    },
    child : {
        first_name: {
            type: String,
            required: true,
            trim : true
        },
        last_name: {
            type: String,
            required: true,
            trim : true
        },
        academic_year: {
            type: String,
            required: true,
            trim : true
        },
        year: {
            type: String,
            required: true,
            trim : true
        },
        religion: {
            type: String,
            required: true,
            trim : true
        },
        nationality: {
            type: String,
            required: true,
            trim : true
        },
        gender: {
            type: String,
            required: true,
            trim : true
        },
        passport_number_id: {
            type: String,
            required: true,
            trim : true
        },
        birth_date: {
            type: String,
            required: true,
            trim : true
        } 
    },
    hasSiblingStudying : {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

const Dataset =mongoose.models.enrollments || mongoose.model('enrollments',enrollmentSchema) 

export default Dataset

// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430