var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment")

// starter data/seed data
var data =[
    {
        name:"Granite Hill",
        image:"https://static8.depositphotos.com/1029554/813/i/600/depositphotos_8137864-stock-photo-camping-tents-at-campground.jpg ",
        description:"This is huge"
    },
    {
        name:"Granite Hill",
    image:"https://static8.depositphotos.com/1029554/813/i/600/depositphotos_8137864-stock-photo-camping-tents-at-campground.jpg ",
    description:"This is huge"},
    {
        name:"Granite Hill",
    image:"https://static8.depositphotos.com/1029554/813/i/600/depositphotos_8137864-stock-photo-camping-tents-at-campground.jpg ",
    description:"This is huge"
    }
]

// loop through data and create a campground for each

function seedDB() {
         //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Removed campgrounds.");
              //Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a campground..");
                        // create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish I had internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment.");
                                }
                            });
                    }
                });
            });
    });
        //Add a few comments
}

module.exports = seedDB;
