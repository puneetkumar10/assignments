exports.sayhello = (req, next) => {
    var message = req.body.message;
    next(null, message);
}