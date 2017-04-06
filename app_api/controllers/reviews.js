var mongoose = require("mongoose");
var Location = mongoose.model("Location");

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.add = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.get = function (req, res) {
    if (!(req.params && req.params.locationId && req.params.reviewId)) {
        sendJsonResponse(res, 404, {"message": "Not found, locationId and reviewId are both required"});
        return;
    }

    Location
        .findById(req.params.locationId)
        .select("name reviews")
        .exec(function (err, location) {
            var response, review;

            if (!location) {
                sendJsonResponse(res, 404, {"message": "No location found for that Id"});
                return;
            }

            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }

            if (!(location.reviews && location.reviews.length > 0)) {
                sendJsonResponse(res, 404, {"message": "No reviews found"});
                return;
            }

            console.log("length: " + location.reviews.length);
            review = location.reviews.id(req.params.reviewId);
            if (!review) {
                sendJsonResponse(res, 404, {"message": "reviewId not found [" + req.params.reviewId + "]"});
                return;
            }

            response = {
                location: {
                    name: location.name,
                    id: req.params.locationId
                },
                review: review
            };

            sendJsonResponse(res, 200, response);
        });
};

module.exports.update = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.delete = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};