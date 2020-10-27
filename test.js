const mongoose =  new require('mongoose')

const Post = new require('./database/models/Post')

mongoose.connect('mongodb://localhost:27017/node-js-test-blog', { useNewUrlParser: true, useUnifiedTopology : true } , function (err, db) {
   // console.log(err, db)
} )


//below will find all the data in post db 
// Post.find({}, (error, post) => {
//     console.log(error, post)
// })

//   Post.find({ 
//       title : 'My second Blog'
//     }, (error, post) => {
//         console.log(error, post)
//     })

//find by ID

// Post.findById("5f96c03946d56e0435712012", (error, post) => {
//       console.log(error, post)
//   })


//to create in db 
// Post.create({
//     title: 'My second Blog',
//     description: 'second Blog description ',
//     content: 'second Blog content'
// }, (error, post) => {
//     console.log(error , post)
// })  


//update db]
Post.findByIdAndUpdate("5f96c03946d56e0435712012",{
  title: "my first Blog updated"  
},(err, post) =>{
    console.log(err, post)
})