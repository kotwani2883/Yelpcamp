var express=require('express');
var router=express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var passport=require("passport")
var LocalStrategy=require("passport-local")
var User=require("../models/user")

// LANDING ROUTE
router.get("/",function(req,res){
    res.render("landing")
})




//========================
//Auth routes
//===========================
//show register form
router.get('/register',function(req,res){
 res.render("register");
})

//handle signup logic
router.post('/register',function(req,res){
    var newUser=new User({username:req.body.username})
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           console.log(err);
           res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
           res.redirect("/campgrounds");
       });
   });
});

//show login form
router.get('/login',function(req,res){
    res.render("login");
})

//handling login logic
router.post('/login',passport.authenticate("local",
{
successRedirect:"/campgrounds",
failureRedirect:"/login"
}),function(req,res){

})

//logout
router.get('/logout',function(req,res){
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;