const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languagesSchema = new Schema({
    name :{
        type : String,
    },
}
);
const Languages = mongoose.model('languages', languagesSchema);
module.exports = Languages;