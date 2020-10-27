const mongoose = new require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    image : String,
    createdAt : {
        type : Date,
        default : new Date()
    }
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post