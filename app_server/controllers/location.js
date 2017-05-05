/* GET 'location info' page */
var request = require("request");
var apiOptions = {
    server: "http://localhost:3000"
};

if (process.env.NODE_ENV === "production") {
    apiOptions.server = "https://sw-loc8r.herokuapp.com/"
}

var renderLocations = function (req, res) {
    res.render('location', {
        title:'Scotto\'s Mobos',
        pageHeader: {title: 'Scotto\'s Mobos'},
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Scott\'s Mobos',
            address:'123 Derbs Street, Derby, DE6 6BY',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {lat: 51.455041, lng: -0.9690884},
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            },{
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            },{
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Twilight Sparkle',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            },{
                author: 'Apple Jack',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'Some crazy stuff went down because some guy had too much sugar'
            }]
        }
    });
};

module.exports.location = function (req, res) {
    renderLocations(req, res);
};