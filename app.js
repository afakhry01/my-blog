///// Req \\\\\
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://blogtest:blogtestpassword1@ds143717.mlab.com:43717/blog");
var postSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: Date,
    image: String,
    description: String
});
var Post = mongoose.model("post", postSchema);

// // Temporary adding to database
// Post.create({
//     title: "My second blog post",
//     author: "Andrew",
//     date: 2018-03-15,
//     image: "http://via.placeholder.com/350x150"
// }, function(error, post){
//     if (error) {
//         console.log("Can't add to db");
//     } else {
//         console.log(post);
//     }
// });


///// RESTful Routes \\\\\

/////////////////////////////////////////////////////////////////////
// Name     url             Method  Description
//==================================================================
// Index    /blog           GET     Display all blog posts
// New      /blog/new       GET     Display a page to add new post
// Create   /blog           POST    Add a new post to database
// Show     /blog/:id       GET     Show a post
// Update   /blog/:id       PUT     Update a post
// Delete   /blog/:id       DELETE  Remove a post
// Edit     /blog/:id/edit  GET     Edit a post
/////////////////////////////////////////////////////////////////////

app.get("/", function(req,res){
    Post.find({}, function(error,posts){
        if(error) {
            console.log(error);
        } else {
            res.render("index",{posts:posts});
        }
    });
});

///// Server \\\\\
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});