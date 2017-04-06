var mongoose = require("mongoose");
var Location = mongoose.model("Location");

var theEarth = (function () {
    var earthRadius = 6371; //km

    return {
        getDistanceFromRads: function (rads) {
            return parseFloat(rads * earthRadius);
        },
        getRadsFromDistance: function (distance) {
            return parseFloat(distance / earthRadius);
        }
    };
})();

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.listByDistance = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        num: 10,
        maxDistance: theEarth.getRadsFromDistance(req.query.maxDistance || 100000)
    };

    if (!lng || !lat) {
        sendJsonResponse(res, 404, {
            "message": "lng and lat query parameters are required"
        });
        return;
    }

    Location.geoNear(point, geoOptions, function (err, results, stats) {
        var locations = [];

        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }

        results.forEach(function (result) {
            locations.push({
                distance: theEarth.getDistanceFromRads(result.dis),
                name: result.obj.name,
                address: result.obj.address,
                rating: result.obj.rating,
                facilities: result.obj.facilities,
                _id: result.obj._id
            });
        });

        sendJsonResponse(res, 200, locations);
    });
};

module.exports.add = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.get = function (req, res) {
    if (!(req.params && req.params.locationId)) {
        sendJsonResponse(res, 404, {"message": "No locationId in request"});
        return;
    }

    Location
        .findById(req.params.locationId)
        .exec(function (err, location) {
            if (!location) {
                sendJsonResponse(res, 404, {"message": "No location found for that Id"});
                return;
            }

            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }

            sendJsonResponse(res, 200, location);
        });
};

module.exports.update = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.delete = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};