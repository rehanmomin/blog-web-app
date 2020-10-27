const Post = new require('../database/models/Post')

module.exports = async (req, res) =>{
    const posts = await Post.find({}).populate('author')

    console.log(req.session)
    res.render('index',{
        posts
    })

    //res.render('index')
    //res.sendFile(path.resolve(__dirname,'pages/index.html'))  
}