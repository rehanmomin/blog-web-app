const mongoose = new require('mongoose')
const bcrypt = new require('bcrypt')

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [ true, 'Please provide your username' ]
    },
    email : {
        type : String,
        required : [ true, 'Please provide your email' ],
        unique : [ true, 'Please use unique email' ]
    },
    password : {
        type : String,
        required : [ true, 'Please provide password' ]
    }
})

UserSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password, 10 , function(error, encrypted){
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)

