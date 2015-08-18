var express = require('express');
var router = express.Router();
 
router.post('/', function (req, res, next) {
 
    var name = req.body.nameEdit;
    var description = req.body.descriptionEdit;
    var addObj = req.session.json;
 
    console.log(addObj.profile[0].socialPersonas.name);
    console.log(addObj.profile[0].socialPersonas.description);
 
    addObj.profile[0].socialPersonas.name = name;
    addObj.profile[0].socialPersonas.description = description;
 
    console.log(addObj.profile[0].socialPersonas.name);
    console.log(addObj.profile[0].socialPersonas.description);
 
 
    function wait(callback) {
        var hash = "";
 
        var ipfs_api = require('ipfs-api');
        var ipfs = ipfs_api('localhost', '5001');
 
        //var test = JSON.stringify(addObj);
        var test = 'hello'
        var test2 = 'hello2'
 
        //ipfs add file function
        ipfs.add([new Buffer(test), new Buffer(test2)], function(err, res) {
            if(err || !res) return console.error(err)
 
            for (var i = 0; i < res.length; i++) {
                console.log(res[i])
            }
        })
        callback(hash);
    }
 
    wait(function (hash) {
        req.session.hash = hash;
        console.log(hash);
        res.render('dashboard', {person: req.session.json});
    });
});
 
module.exports = router;
