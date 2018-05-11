const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
    name : {
        type : String, 
        unique :  true,
        required : [true, 'book author first name is required']
    },
}
);
const Authors = mongoose.model('authors', authorsSchema);
module.exports = Authors;