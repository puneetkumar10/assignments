var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var allApiCall = new Schema({
    id:ObjectId,
    req:Object,
    res:Object,    
    createDate:{type:Date ,
    default:Date.now}
});


module.exports = mongoose.model('allApiCall',allApiCall);