/* GET 'location info' page */
module.exports.location = function (req, res) {
    res.render('location', {title:'Location Info'})
}