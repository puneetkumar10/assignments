var express = require('express');
var router = express.Router();
var dockerService = require("../services/dockerServices");

router.post('/servercall', (req,res) => {
  dockerService.sayhello(req , (err,result) => {
    if(err) {
      res.status(500).json({ status: 1, message: 'Failure', data: err });
    }
    else {
      res.status(200).json({ status: 1, message: 'Success', data: result });
    }
  })
});

module.exports = router;
