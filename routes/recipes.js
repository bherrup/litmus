var http = require('http');

exports.current = function (req, res) {

    var apiKey = "856469aece773c464c6eefa268e80e6e";
    var url = "http://api.whoapi.com/?domain=" + req.params.id + "&apikey=" + apiKey + "&r=taken";

    http.get(url, function(resp){
      var str = "";

      resp.on('data', function(chunk){
          str += chunk;
      });

      resp.on('end', function() {

          var returnVal = JSON.parse(str);
          var taken = (returnVal["taken"] == 0) ? false : true;
          res.json({success: true, taken: taken});
      });
    }).on("error", function(e){
          res.json({success: false});
    });
}

