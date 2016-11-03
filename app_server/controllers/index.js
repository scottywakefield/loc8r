/* GET home page */
module.exports.index = function(req, res){
    res.render('index', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find places to work near you!'
        }
    });
};