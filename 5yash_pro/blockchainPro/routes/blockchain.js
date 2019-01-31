var express = require('express');
var blockchainService = require("../services/blockchainService")
var router = express.Router();

router.get("/getbalance", (req, res) => {
  blockchainService.getBalance(req, (err, result) => {
    if (err)
      res.status(200).json({ status: 0, message: err, data: {} });
    else
      res.status(200).json({ status: 1, message: 'success', data: "Balance : " + result.body + " DOGE" });
  })
});

router.get("/balancestellarwallet", (req, res) => {
  blockchainService.getBalanceStellar(req, (err, result) => {
    if (err)
      res.status(200).json({ status: 0, message: err, data: {} });
    else {
      res.status(200).json({ status: 1, message: 'success', data: "Balance : " + result.substr(result.search("Current Balance")+16,13)});
    }
  })
});

module.exports = router;
