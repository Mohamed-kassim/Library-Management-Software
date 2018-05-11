const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issuedBookSchema = new Schema({
    member_id : {
        type : String, 
        required : [true, 'book isbn is required']
    },
    user_id :{
        type : Number,
        required : [true, 'book author is required']
    },
    date_issued :{
        type : Number,
        required : [true, 'book author is required']
    },
    isbn :{
        type : Number,
        required : [true, 'book edition is required']
    },
    issue_type : {
        type : String,
        required : [true, 'issue type is required']
    }
}
);
const issuedBooks = mongoose.model('issuedBooks', issuedBookSchema);
module.exports = issuedBooks;