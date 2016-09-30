/* GET 'review add' page */
module.exports.add = function (req, res) {
    res.render('review', {title:'Add a Review'})
}