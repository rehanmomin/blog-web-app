module.exports = (req, res) => {

    res.render('register', {
       // errors : req.session.registrationErrors
       errors : req.flash('registrationErrors'),
       data : req.flash('data')[0]
    })
}