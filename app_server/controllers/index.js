/* GET home page */

var request = require("request");
var apiOptions = {
    server: "http://localhost:3000"
};

if (process.env.NODE_ENV === "production") {
    apiOptions.server = "https://sw-loc8r.herokuapp.com"
}

var formatDistance = function (distance) {
    if (isNaN(distance)) {
        console.log('distance NaN');
        return 'NaN';
    }

    var numDistance, unit;
    if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = ' km';
    } else {
        numDistance = parseInt(distance * 1000, 10);
        unit = ' m';
    }
    return numDistance + unit;
};

var renderLocations = function (req, res, responseBody) {
    res.render('index', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find places to work near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. " +
        "Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: responseBody
    });
};

module.exports.index = function(req, res){
    var path = "/api/locations",
        requestOptions = {
            url: apiOptions.server + path,
            method: "GET",
            json: {},
            qs: {
                lng: -0.9631,
                lat: 51.45,
                maxDistance: 500
            }
        };

    request(requestOptions, function (err, response, body) {
        var i, data;
        data = body;
        for (i=0; i<data.length; i++) {
            data[i].distance = formatDistance(data[i].distance);
        }
        renderLocations(req, res, data);
    });
};
