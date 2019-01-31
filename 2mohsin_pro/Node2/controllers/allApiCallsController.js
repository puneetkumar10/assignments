var mongoose = require('mongoose');

exports.createRecord = (req, res) => {
    module.exports.saveRecord(req, res, (error) => {
        if (error) {
            console.log('data not stored because of error:  ');
        }
        else {
            console.log('data successfully stored');
        }
    })
}

exports.saveRecord = (req_param, res_param, next) => {
    var allModel = mongoose.model('allApiCall');
    var allRecord = new allModel()
    allRecord.req = JSON.parse(req_param);
    allRecord.res = JSON.parse(res_param);
    allRecord.save((err, data) => {
        if (err)
            next(err, null);
        else
            next(null, data);
    })
}