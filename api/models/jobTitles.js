const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobTitlesSchema = new Schema({
    name :{
        type : String,
    },
}
);
const jobTitles = mongoose.model('jobTitles', jobTitlesSchema);
module.exports = jobTitles;