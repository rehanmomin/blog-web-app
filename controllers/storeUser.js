const User = require('../database/models/User')

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

      // req.session.registrationErrors = registrationErrors  as this is permanent
      req.flash('registrationErrors', registrationErrors) //this will remain only for single request cycle
      req.flash('data' , req.body)
      return res.redirect('/auth/register')
    }
    res.redirect('/')
  })
}