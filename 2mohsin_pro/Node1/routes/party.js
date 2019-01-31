var express = require('express');
var router = express.Router();
var partyService = require("../services/partyService")
var responseService = require("../services/helper.service")

// api for posting party
router.post("/createparty", (req, res) => {
    partyService.createParty(req, (err, result) => {
        if (err)
            responseService.response(req, err, null, res);
        else
            responseService.response(req, null, result, res);
    })
});

// api for fetching parties
router.get("/allparty", (req, res) => {
    partyService.getParty(req, (err, result) => {
        if (err)
            responseService.response(req, err, null, res);
        //res.status(200).json({ status: 0, message: err, data: {} });
        else
            responseService.response(req, null, result, res);
        // res.status(200).json({ status: 1, message: 'Success', data: result });
    })
});

// api for fetching parties
router.delete("/deleteparty", (req, res) => {
    partyService.removeParty(req, (err, result) => {
        if (err)
            responseService.response(req, err, null, res);
        else
            responseService.response(req, null, result, res);
    })
});


module.exports = router;