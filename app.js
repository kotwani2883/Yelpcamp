// Require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport=require("passport")
var LocalStrategy=require("passport-local")
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var User=require("./models/user")
var seedDB = require("./seed");
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index")


// Set up env
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));



mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});

// Add seed data
seedDB();


//passport config
app.use(require("express-session")({
    secret:"I am Palak",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})


app.use(indexRoutes);
app.use("/campgrounds/:id/comments" ,commentRoutes);
app.use("/campgrounds",campgroundRoutes);


//Start the server
app.listen(3000,process.env.PORT,process.env.IP,()=>{
    console.log(`Server is up and Running!!! `);
})