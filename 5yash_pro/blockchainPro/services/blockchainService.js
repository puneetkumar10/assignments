var request = require('request');
var cmd = require("node-cmd");

exports.getBalance = async (req, next) => {
    address = req.query.address;
    request(`https://dogechain.info/chain/Dogecoin/q/addressbalance/${address}`, (err, response, body) => {
        if (err)
            next(err.message, null);
        else {
            next(null, response);
        }
    })
}

exports.getBalanceStellar = async (req, next) => {
    address = req.query.address;
    cmd.get(
        'stellar-wallet-cli balance ' + address, (err, response, body) => {
            if (err)
                next(err, null)
            else
                next(null, response)
        }
    );
}