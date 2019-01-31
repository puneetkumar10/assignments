var config = require('../config/config').config();
var request = require('request');
var MongoClient = require('mongodb').MongoClient;

exports.createParty = async (req, next) => {
    var q = req.body;
    result = {
        name: q.name,
        occasion: q.occasion,
        date: q.date,
        node: q.node
    }
    if (q.node == "NODE2") {
        await request.post({
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: 'http://localhost:3000/party/createparty',
            form: {
                name: q.name,
                occasion: q.occasion,
                date: q.date,
            }
        }, function (error, response, body) {
            console.log(body);
        });
    }
    next(null, result)
}

exports.getParty = (req, next) => {
    MongoClient.connect(config.url, function (err, db) {
        if (err)
            next(err);
        else {
            var dbo = db.db("partydb2");
            dbo.collection("postparties").find({}).toArray(function (err, result) {
                if (err)
                    next(null, err);
                else {
                    var response = []
                    result.forEach(function (element) {
                        response.push(element.res.data);
                    });
                }
                next(null, response);
                db.close();
            });
        }
    });
}

exports.removeParty = (req, next) => {
    var q = req.body;
    var nameSearch = q.name;
    var dateSearch = q.date;
    MongoClient.connect(config.url, function (err, db) {
        if (err)
            next(err);
        else {
            var dbo = db.db("partydb2");
            var myquery = { "res.data.name": nameSearch, "res.data.date": dateSearch };
            //     dbo.collection("postparties").find({}).toArray(function (err, result) {
            dbo.collection("postparties").deleteOne(myquery, function (err, result) {
                if (err)
                    next(null, err);
                else {
                    next(null, result);
                    db.close();
                }
            });

            request.delete({
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                url: 'http://localhost:3000/party/deleteparty',
                form: {
                    name: q.name,
                    date: q.date
                }
            }, function (error, response, body) {
                console.log(body);
            });
        }

    });

}


