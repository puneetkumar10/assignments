var postPartyController = require("../controllers/postPartyController");
var allApiController = require("../controllers/allApiCallsController")
var moment = require("moment");

module.exports.response = (req, err, data, res) => {
    if (err)
        res.status(200).json({ status: 0, message: err, data: {} });
    else {
        let date = moment().format("YYYY-MM-DD")
        let response_obj = { status: 1, message: 'Success', data: data };
        let request_obj = { url: req.originalUrl, date: date };
        res.status(200).json({ status: 1, message: 'Success', data: response_obj.data });
        allApiController.createRecord(JSON.stringify(request_obj), JSON.stringify(response_obj));
        if(request_obj.url == "/party/createparty")
        postPartyController.createRecord(JSON.stringify(request_obj), JSON.stringify(response_obj));
    }
}