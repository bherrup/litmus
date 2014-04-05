var http = require('follow-redirects').http;
var FB = require('fb');
FB.setAccessToken(process.env.FBTOKEN);

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
          console.log(returnVal);
          if(returnVal["status"] != '0') {
              callback(false, false);
          } else {
              callback(true, (returnVal["taken"] == 0) ? false : true);
          }
      });
    }).on("error", function(e){
        callback(true);
    });
}

var facebook_search = function(fbhandle, callback) {
    FB.api(fbhandle, function (res) {
      if(!res || res.error) {
          callback(false);
      }
      callback(true);
    });
}

var service_404_check = function(url, callback) {
    http.get(url, function(resp){
      var str = "";

      if(resp.statusCode >= 200 && resp.statusCode < 300) {
          callback(true);
      } else {
          callback(false);
      }
    }).on("error", function(e){
        console.log("Error");
        callback(false);
    });
}

var twitter_search = function(twitterHandle, callback) {
    var url = "http://twitter.com/" + twitterHandle;
    service_404_check(url, callback);
}

var google_search = function(twitterHandle, callback) {

}

var angellist_search = function(twitterHandle, callback) {
    var url = "http://angel.co/" + twitterHandle;
    service_404_check(url, callback);
}

var instagram_search = function(twitterHandle, callback) {
    var url = "http://instagram.com/" + twitterHandle;
    service_404_check(url, callback);
}

var vimeo_search = function(twitterHandle, callback) {
    var url = "http://vimeo.com/" + twitterHandle;
    service_404_check(url, callback);
}

var dribbble_search = function(twitterHandle, callback) {
    var url = "http://dribbble.com/" + twitterHandle;
    service_404_check(url, callback);
}

var linkedin_search = function(twitterHandle, callback) {
    var url = "http://linkedin.com/" + twitterHandle;
    service_404_check(url, callback);
}

var etsy_search = function(twitterHandle, callback) {
    var url = "http://etsy.com/" + twitterHandle;
    service_404_check(url, callback);
}

var github_search = function(twitterHandle, callback) {
    var url = "http://github.com/" + twitterHandle;
    service_404_check(url, callback);
}

var pinterest_search = function(twitterHandle, callback) {
    var url = "http://pinterest.com/" + twitterHandle;
    service_404_check(url, callback);
}

exports.taken = function (req, res) {
    if(req.params.platform == "webpage") {
        domain_search(req.params.id, function(success, exists) {
            if(success) {
                res.json({success: true, taken: exists});
            } else {
                res.json({success: false});
            }
        });
    } else if(req.params.platform == "facebook") {
          facebook_search(req.params.id, function(exists) {
              res.json({success: true, taken: exists});
          });
    } else if(req.params.platform == "twitter") {
        // twitter_search(req.params.id, function(exists) {
          res.json({success: true, taken: false});
        // });
    } else if(req.params.platform == "pinterest") {
        pinterest_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });
    } else if(req.params.platform == "google") {
          res.json({success: true, taken: false});
    } else if(req.params.platform == "instagram") {
        instagram_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });
    } else if(req.params.platform == "vimeo") {
        vimeo_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });
    } else if(req.params.platform == "dribbble") {
        dribbble_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });

    } else if(req.params.platform == "linkedin") {
        linkedin_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });
    } else if(req.params.platform == "angellist") {
        angellist_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });
    } else if(req.params.platform == "etsy") {
        etsy_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });
    } else if(req.params.platform == "github") {
        github_search(req.params.id, function(exists) {
          res.json({success: true, taken: exists});
        });

    } else {
        res.json({success: false});
    }
}
