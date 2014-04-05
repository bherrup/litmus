var http = require('http');


var domain_search = function (domain, callback) {
    var apiKey = "856469aece773c464c6eefa268e80e6e";
    var url = "http://api.whoapi.com/?domain=" + domain + "&apikey=" + apiKey + "&r=taken";

    http.get(url, function(resp){
      var str = "";

      resp.on('data', function(chunk){
          str += chunk;
      });

      resp.on('end', function() {
          var returnVal = JSON.parse(str);
          callback((returnVal["taken"] == 0) ? false : true);
      });
    }).on("error", function(e){
        callback(true);
    });
}

exports.taken = function (req, res) {
    if(req.params.platform == "webpage") {
        domain_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });
    } else {
        res.json({success: false});
    }
}
