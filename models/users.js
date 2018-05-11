const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name : {
        type : String, 
        required : [true, 'user name is required']
    },
    job_id :{
        type : String,
        required : [true, 'job id  is required']
    },
    branch_id :{
        type : Number,
        required : [true, 'job id is required']
    },
    telephone_number :{
        type : Number,
        required : [true, 'telephone number is required']
    },
    address :{
        type : Number,
        required : [true, 'address is required']
    },
    pay_rate :{
        type : Number,
        required : [true, 'pay rate is required']
    },
    work_hours :{
        type : Number,
        required : [true, 'work hours is required']
    },
}
);
const Users = mongoose.model('users', usersSchema);
module.exports = Users;