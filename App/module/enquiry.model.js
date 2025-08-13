let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let enquirySchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
});
let enquiryModel = mongoose.model('Enquiry',enquirySchema);
module.exports = enquiryModel;