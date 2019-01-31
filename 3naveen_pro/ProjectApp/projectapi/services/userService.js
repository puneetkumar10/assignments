var config = require('../config/config').config();
var MongoClient = require('mongodb').MongoClient;

exports.createUser = async (req, next) => {
    var q = req.body;
    //check for existing user
    MongoClient.connect(config.url, function (err, db) {
        var dbo = db.db("userdb");
        dbo.collection("userinfos").findOne({ "res.data.username": q.username }, function (err, result) {
            if (err) {
                next(null, err);
                db.close();
            }
            else if (result == null) {
                result = {
                    username: q.username,
                    password: q.password
                }
                next(null, result);
                db.close();
            }
            else {
                next(null, null);
                db.close();
            }
        });
    });
}

exports.loginUser = (req, next) => {
    var q = req.body;
    MongoClient.connect(config.url, function (err, db) {
        if (err)
            next(err);
        else {
            var dbo = db.db("userdb");
            dbo.collection("userinfos").findOne({ "res.data.username": q.username, "res.data.password": q.password }, function (err, result) {
                if (err) {
                    next(null, err);
                    db.close();
                }
                else {
                    next(null, result);
                    db.close();
                }
            });
        }
    });
}


