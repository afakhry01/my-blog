///// Req \\\\\
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

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
//     title: "My third blog post",
//     author: "Andrew",
//     date: 2018-03-15,
//     image: "http://via.placeholder.com/350x150",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum mi molestie lorem suscipit cursus. Suspendisse molestie, sapien a commodo efficitur, turpis ante hendrerit felis, sit amet auctor leo massa eget diam. Nunc a vehicula ex, vel efficitur velit. Morbi a elit consectetur erat aliquet vulputate. Vivamus quam purus, vehicula non interdum finibus, elementum ullamcorper nisi. In vel congue ipsum, sit amet ultricies dui. Nam ex nisi, cursus quis ante in, commodo ultricies ipsum. Fusce vehicula, ex nec congue blandit, odio leo interdum ex, sed dictum diam lectus ac erat. Curabitur lobortis non nibh non cursus. Ut commodo commodo consectetur. Proin vel finibus lorem. Pellentesque lacinia massa eu faucibus consectetur. Morbi mi libero, semper at ipsum eget, varius scelerisque dolor. Phasellus at nunc nec dolor cursus dapibus ac a nisl. Donec dignissim a ex nec blandit. Nunc metus neque, ultricies a volutpat non, gravida sed nisi./nQuisque rhoncus, est eget porttitor lacinia, nibh arcu accumsan ipsum, vitae dignissim nisl odio non nisl. Quisque ullamcorper bibendum pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi dapibus turpis elit. Proin tristique nisi risus, lobortis ornare libero placerat et. Aenean mollis posuere magna eu varius. Cras interdum sapien sem, eu mollis orci posuere sit amet. Aenean turpis purus, rutrum ut dui eu, luctus pretium nisi. Donec id gravida augue. Donec porta nibh vitae neque tincidunt finibus. Etiam rutrum neque ac neque lobortis volutpat in et augue. Sed sodales suscipit elit, nec euismod ligula aliquet vitae./nNulla cursus erat dui, at fringilla ex semper a. Donec faucibus, lacus nec mollis sollicitudin, ligula elit hendrerit dolor, quis aliquet odio augue quis sapien. Etiam vitae ullamcorper odio. Vivamus eget risus iaculis, bibendum purus id, dapibus velit. Aliquam sapien metus, auctor ut cursus nec, rutrum vel diam. Nam ornare tortor id leo hendrerit, non rutrum nisi ultrices. Ut neque diam, commodo ac sem vel, semper vestibulum neque. Nullam id dictum ex, nec gravida dolor. Curabitur consequat cursus urna imperdiet porta. Quisque eget lorem metus. Suspendisse aliquam ultrices convallis. Vestibulum nec dictum orci. Morbi et varius urna. Duis pulvinar erat eget consequat congue. Aliquam vitae mauris arcu. Aliquam vel tellus sapien./nSed ut imperdiet mauris, eget fringilla eros. Nunc viverra maximus venenatis. Etiam eleifend pretium mi, quis sagittis magna iaculis a. Sed quis semper sem. Aliquam in pulvinar magna. Proin sed elit tempus, maximus est at, dapibus elit. Mauris ut nibh sit amet orci rhoncus semper. Mauris convallis, mi et molestie tincidunt, eros mi dignissim elit, vel vulputate nisi ante eu nisi. Mauris ut diam id arcu imperdiet sagittis. Curabitur sed mi commodo, vehicula massa sed, dignissim ipsum. Ut vitae nibh vel nulla volutpat egestas. Donec quam metus, eleifend a magna vel, ultricies pretium leo. Nam tincidunt sagittis lorem quis euismod. Proin bibendum a libero sit amet ultrices./nMauris auctor iaculis lectus. Quisque eget convallis nibh. Maecenas magna lorem, ultricies in porttitor pharetra, pellentesque eu sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sapien ligula, dignissim eu arcu sed, ultrices ultrices ligula. Nunc blandit blandit dolor, id molestie odio vulputate quis. Proin ultrices pretium lacinia. Duis tempor volutpat lacinia. Phasellus tempor sit amet magna eget semper. Quisque gravida mattis nisl, et condimentum nulla fermentum nec."
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

app.get("/blog", function(req,res){
    Post.find({}, function(error,posts){
        if(error) {
            console.log(error);
        } else {
            res.render("index",{posts:posts});
        }
    });
});

app.get("/blog/new", function(req,res){
    res.render("newPost");
});

app.post("/blog", function(req,res){
    Post.create({
         title : req.body.title,
         author : req.body.author,
         date : new Date(),
         image : req.body.image,
         description : req.body.description
    }, function(error, post){
        if(error){
            console.log(error);
        } else {
            res.redirect("/blog");
        }
    });
});

app.get("/blog/:id", function(req,res){
    Post.findById(req.params.id,function(error,post){
        if (error) {
            console.log(error);
        } else {
            res.render("showPost", { post : post });
        }
    });
});

// Edit a post
app.get("/blog/:id/edit", function(req,res){
    Post.findById(req.params.id, function(error,post) {
        if (error) {
            res.redirect("/blog/"+req.params.id);
        } else {
            res.render("editPost",{post:post});
        }
    });
});

// Update a post
app.put("/blog/:id", function(req,res) {
    Post.findByIdAndUpdate(req.params.id,req.body.blog, function(error,post){
        if (error) {
            res.redirect("/blog/"+req.params.id);
        } else {
            res.redirect("/blog/"+req.params.id);
        }
    });
});

// Delete a Post
app.delete("/blog/:id", function(req,res){
    Post.findByIdAndRemove(req.params.id, function(error,post){
        if (error) {
            res.redirect("/blog");
        } else {
            res.redirect("/blog");
        }        
    });
});

///// Server \\\\\
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});