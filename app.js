const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const app = express();
const _ = require("lodash")

const homeStartingContent = "Rumour has it targeted online advertising was developed because the internet was upset that you could read it but it couldn't read you. Trepidelicious. I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache. You should  (check out the rest of my portfolio). Cemeteries are just garbage dumps filled with humans. We say we are walking the dog, but the dog always leads.";
const aboutContent = "You know the Grammys are a joke when Future doesn't win Best Everything. For the name of an act as serious as killing someone, assassination literally translates to buttbuttination. INjuries always keep you OUT of things. Visticula. You should (check out the rest of my portfolio). If you wake up with a giant zit, you are really facing your fears when you look in the mirror.";
const contactContent = "If the word kerning is kerned poorly, it kind of looks like learning - which is appropriate because both are important. I'm the only person in the world with my name. Pantone is a colour but also the singular version of pants. Curling is the best sport named after something you do to your hair. Cemeteries are just garbage dumps filled with humans.";

// var allPost=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
    title : String,
    content : String
}

const Post = mongoose.model("Post",postSchema)

app.get("/",function(req,res){

    Post.find({}, function(err, posts){
        res.render("home", {
          startingContent: homeStartingContent,
          posts: posts     
          });
     
      })
})

app.get("/about",function(req,res){
    res.render("about",{aboutContentVariable:aboutContent});
})

app.get("/contact",function(req,res){
    res.render("contact",{contactContentVariable:contactContent});
})

app.get("/compose",function(req,res){
    res.render("compose");
})

app.post("/compose",function(req,res){    
   const post = new Post({
        title:req.body.title,
        content:req.body.post
    })
    post.save(function(err){
        if(!err){
            console.log("Saved!!!")
        }
    })
    res.redirect("/");
})

app.get("/posts/:postId",function(req,res){
    const requestedPostId = req.params.postId;
      Post.findOne({_id: requestedPostId},function(err,post){
        res.render("post", {
            title: post.title,
            content: post.content
          });
    })   
})

app.listen(3000,function(req,res){
    console.log("server started on port 3000.....")
})