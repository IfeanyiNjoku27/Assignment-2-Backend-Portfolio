module.exports.home = function(req, res, next){

    let messageObj = {
        message: "Welcome to My Portfolio Application"
    }

    res.json(messageObj);
}