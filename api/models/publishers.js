const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publishersSchema = new Schema({
    name : {
        type : String, 
        required : [true, 'publisher name is required']
    },
    email :{
        type : String,
        required : [true, 'publisher email is required']
    },
    telephone_number :{
        type : Number,
        required : [true, 'telephone number is required']
    },
}
);
const Publishers = mongoose.model('publishers', publishersSchema);
module.exports = Publishers;