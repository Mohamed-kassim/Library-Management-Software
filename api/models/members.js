const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membersSchema = new Schema({
    name : {
        type : String, 
        required : [true, 'member  name is required']
    },
    branch_id :{
        type : String,
        required : [true, 'branch id is required']
    },
    telephone_number :{
        type : Number,
        required : [true, 'telephone number is required']
    },
}
);
const Members = mongoose.model('members', membersSchema);
module.exports = Members;