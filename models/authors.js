const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
    first_name : {
        type : String, 
        required : [true, 'book author first name is required']
    },
    last_name :{
        type : String,
        required : [true, 'book author last name is required']
    },
}
);
const Authors = mongoose.model('authors', authorsSchema);
module.exports = Authors;