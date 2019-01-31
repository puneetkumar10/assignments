var express = require('express');
var router = express.Router();
var userService = require("../services/userService")
var responseService = require("../services/helper.service")
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// api for posting party
router.post("/createuser", (req, res) => {
    userService.createUser(req, (err, result) => {
        if (err)
            responseService.response(req, err, null, res);
        else
            responseService.response(req, null, result, res);
    })
});

router.post("/login", (req, res) => {
    userService.loginUser(req, (err, result) => {
        if (err)
            responseService.response(req, err, null, res);
        else {
            responseService.response(req, null, result, res);
        }

    })
});

module.exports = router;
