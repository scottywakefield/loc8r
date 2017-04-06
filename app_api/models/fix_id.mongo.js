var bulk = db.locations.initializeOrderedBulkOp(),
    count = 0;

db.locations.find({ "reviews.id": { "$exists": true } }).forEach(function(loc) {
    loc.reviews.forEach(function(review) {
        if ( review.hasOwnProperty("id") ) {
            if (!review.hasOwnProperty("_id")) {
                bulk.find({ "_id": loc._id, "reviews.id": review.id }).updateOne({
                    "$set": { "reviews.$._id": review.id }
                });
            }

            bulk.find({ "_id": loc._id, "reviews.id": review.id }).updateOne({
                "$unset": { "reviews.$.id": 1 }
            });
            count += 2;

            if ( count % 500 == 0 ) {
                bulk.execute();
                bulk = db.locations.initializeOrderedBulkOp();
            }
        }
    });
});

if ( count % 500 !== 0 )
    bulk.execute();