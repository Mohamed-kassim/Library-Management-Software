const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name : {
        type : String,
        required : [true, 'book name is required']
    },
    isbn : {
        type : String, 
        unique :  [true, 'isbn must be unique '],
        required : [true, 'book isbn is required']
    },
    author_id :{
        type : Number,
        required : [true, 'book author is required']
    },
    Publisher_id :{
        type : Number,
        required : [true, 'book author is required']
    },
    edition :{
        type : Number,
        required : [true, 'book edition is required']
    },
    book_shelf :{
        type : String,
        required : [true, 'book_shelf is required']
    },
    row_number :{
        type : Number,
        required : [true, 'book row_number is required']
    },
    column_number :{
        type : Number,
        required : [true, 'book column_number is required']
    },
    description : {
        type : String 
    },
    available : {
        type : Boolean,
        default : true
    },
    language_id : {
        type : Number,
    }

}
);
const Books = mongoose.model('books', bookSchema);
module.exports = Books;