/* GET 'about' page */
module.exports.about = function(req, res){
    res.render('generic-text', {
        title: 'About Loc8r',
        content: 'Loc8r was created to help people find places to sit down and get some work done, maybe with a coffee, why not?\n\nLorem ipsum blah blah ... stuff.\n\nMore stuff from controller.'
    });
};