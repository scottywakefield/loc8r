var mongoose = require("mongoose");
var Location = mongoose.model("Location");

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var addReview = function (req, res, location) {
    if (!location) {
        sendJsonResponse(res, 404, {"message": "Not found, locationId required"});
        return;
    }

    location.reviews.push({
        author: req.body.author,
        rating: req.body.rating,
        reviewText: req.body.reviewText
    });

    location.save(function (err, location) {
        var thisReview;

        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }

        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJsonResponse(res, 201, thisReview);
    });
};

var updateAverageRating = function (locationId) {
    Location
        .findById(locationId)
        .select("rating reviews")
        .exec(function (err, location) {
            if (err) {
                return;
            }

            setAverageRating(location);
        });
};

var setAverageRating = function (location) {
    var i, reviewCount, ratingAverage, ratingTotal;

    if (!location.reviews || location.reviews.length === 0) {
        return;
    }

    reviewCount = location.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
        ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;
    location
        .save(function (err) {
            if (err) {
                console.log(err);
                return;
            }

            console.log("Average rating updated to: " + ratingAverage);
        });
};

module.exports.add = function (req, res) {
    if (!(req.params && req.params.locationId)) {
        sendJsonResponse(res, 404, {"message": "Not found, locationId required"});
        return;
    }

    Location
        .findById(req.params.locationId)
        .select("reviews")
        .exec(function (err, location) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                addReview(req, res, location);
            }
        });
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
    if (!(req.params && req.params.locationId && req.params.reviewId)) {
        sendJsonResponse(res, 404, {"message": "Not found, locationId and reviewId are both required"});
        return;
    }

    Location
        .findById(locationId)
        .select("reviews")
        .exec(function (err, location) {
            if (err) {
                sendJsonResponse(res, 400, err);
                return;
            } else if (!location) {
                sendJsonResponse(res, 404, {"message": "No location found for that location Id"});
                return;
            } else if (!(location.reviews && location.reviews.length > 0)) {
                sendJsonResponse(res, 404, {"message": "No reviews found for that location"});
                return;
            }

            var thisReview = location.reviews.id(req.params.reviewId);

            if (!thisReview) {
                sendJsonResponse(res, 404, {"message": "No review found for that review Id"});
                return;
            }

            thisReview.author = req.body.author;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;

            location.save(function (err, location) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

                updateAverageRating(location._id);
                sendJsonResponse(res, 200, thisReview);
            })
        });
};

module.exports.delete = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};