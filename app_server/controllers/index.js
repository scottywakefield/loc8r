/* GET home page */
module.exports.index = function(req, res){
    res.render('index', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find places to work near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. " +
            "Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: [{
            name: 'Starcups',
            address:'123 Derbs Street, Derby, DE6 6BY',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '25m'
        },{
            name: 'Cafe Hero',
            address:'5 Lichfield Road, Sutton Coldfield, B55 7GG',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '65m'
        },{
            name: 'Burger Queen',
            address:'3 Station Street, Nottingham, NT6 6BY',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '100m'
        }]
    });
};