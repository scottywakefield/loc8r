/* GET home page */

var request = require("request");
var apiOptions = {
    server: "http://localhost:3000"
};

if (process.env.NODE_ENV === "production") {
    apiOptions.server = "https://sw-loc8r.herokuapp.com"
}

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
                lng: -0.967,
                lat: 51.454,
                maxDistance: 20000000
            }
        };

    request(requestOptions, function (err, response, body) {
        renderLocations(req, res, body);
    });
};