/* GET 'review add' page */
module.exports.add = function (req, res) {
    res.render('review', {
        title:'Review Scotto\'s Mobos on Loc8r',
        pageHeader: { title: 'Review Scotto\'s Mobos'}
    });
};