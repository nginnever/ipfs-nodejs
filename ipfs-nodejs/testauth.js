var express = require('express');
var router = express.Router();

/* GET home page. */

//can take from form action as validation, ipfs peer ids are public, data privacy not available currently  
router.get('/', function (req, res, next) {
    hashs = "QmZTkaNJgi8EoggtzAubT8qPxfhvyqVg5AUMt3ChW3hv7V";
    function wait(hashs, callback) {


        var ipfs_api = require('ipfs-api');
        var ipfs = ipfs_api('localhost', '5001');

        var obj = {};

        ipfs.cat(hashs, function (err, res) {
            if (err || !res) return console.error(err);

            if (res.readable) {
                // Returned as a stream
                //res.pipe(process.stdout); //string the buffer instead of console logging it as to not use up the response

                var string = '';

                res.setEncoding('utf8');
                res.on('readable', function () {
                    var part = res.read().toString();
                    string += part;
                    obj = JSON.parse(string);
                    callback(obj);
                })

            } else {
                // Returned as a string
                console.log(res); //server side ipfs-api returns buffer
            }
        })
    }

    //callback to wait for ipfs response
    wait(hashs, function (obj) {
        res.render('testauth', {
            title: 'Your Web Page Title',
            object: obj
        });
    });

});

module.exports = router;
