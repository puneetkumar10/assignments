var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userInfo = new Schema({
    id:ObjectId,
    req:Object,
    res:Object,    
    createDate:{type:Date ,
    default:Date.now}
});


module.exports = mongoose.model('userInfo',userInfo);