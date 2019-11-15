"use strict";
var request = require('request'),
    q = require('q');

function get(ref) {
    var deferred = q.defer();
    if (Array.isArray(ref)) {
        ref = ref.join(",");
    }
    var url = "https://specref.herokuapp.com/bibrefs?refs=" +  ref;
    function onResponse(err, response, body) {
        // istanbul ignore if
        if (err) {
            deferred.reject(err);
        } else if (response.statusCode == 200) {
            deferred.resolve(JSON.parse(body));
        } else {
            deferred.reject(response.statusCode);
        }
    }
    request.get({
        url: url,
        headers: { "User-Agent": "ganesh" }
    }, onResponse);
    return deferred.promise;
}

exports.get = get;