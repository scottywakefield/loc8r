var express = require("express");
var router = express.Router();
var ctrlLocations = require("../controllers/locations");
var ctrlReviews = require("../controllers/reviews");

//locations
router.get("/locations", ctrlLocations.listByDistance);
router.post("/locations", ctrlLocations.add);
router.get("/locations/:locationId", ctrlLocations.get);
router.put("/locations/:locationId", ctrlLocations.update);
router.delete("/locations/:locationId", ctrlLocations.delete);

//reviews
router.post("/locations/:locationId/reviews", ctrlReviews.add);
router.get("/locations/:locationId/reviews/:reviewId", ctrlReviews.get);
router.put("/locations/:locationId/reviews/:reviewId", ctrlReviews.update);
router.delete("/locations/:locationId/reviews/:reviewId", ctrlReviews.delete);

module.exports = router;