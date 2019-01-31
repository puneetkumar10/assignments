var userInfoController = require("../controllers/userInfoController");
var allApiController = require("../controllers/allApiCallsController")
var moment = require("moment");

module.exports.response = (req, err, data, res) => {
    if (err)
        res.status(200).json({ status: 0, message: err, data: {} });
    else {
        if (req.originalUrl == "/user/login") {
            let date = moment().format("YYYY-MM-DD")
            let response_obj = { status: 1, message: 'Success', data: data };
            let request_obj = { url: req.originalUrl, date: date };
            if (data == null) {
                let request_obj = { url: req.originalUrl, date: date };
                let response_obj = { status: 0, message: 'User doesnt exist', data: null };
                res.status(404).json({ status: 0, message: 'User doesnt exist', data: response_obj.data });
                allApiController.createRecord(JSON.stringify(request_obj), JSON.stringify(response_obj));
            }
            else {
                res.status(200).json({ status: 1, message: 'Success', data: response_obj.data });
                allApiController.createRecord(JSON.stringify(request_obj), JSON.stringify(response_obj));
            }
        }
        else if (req.originalUrl == "/user/createuser") {
            let date = moment().format("YYYY-MM-DD")
            if (data != null) {
                let request_obj = { url: req.originalUrl, date: date };
                let response_obj = { status: 1, message: 'Success', data: data };
                res.status(200).json({ status: 1, message: 'Success', data: response_obj.data });
                userInfoController.createRecord(JSON.stringify(request_obj), JSON.stringify(response_obj));
                allApiController.createRecord(JSON.stringify(request_obj), JSON.stringify(response_obj));
            }
            else {
                let response_obj = { status: 0, message: 'User Already Exist', data: null };
                let request_obj = { url: req.originalUrl, date: date };
                res.status(404).json({ status: 0, message: 'User Already Exist', data: null });
                allApiController.createRecord(JSON.stringify(request_obj), JSON.stringify(response_obj));
            }
        }
    }
}