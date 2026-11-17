let express = require('express');
let router = express.Router();
let mongoose = require("mongoose")

let event = require("../models/event")

// Read all listings from the DB
router.get('/events', async(req, res, next) => {
    try{
        const eventListings = await event.find();
        res.render("Events/event_list", {
            title: "Event List",
            eventListings: eventListings
        })
    } catch(err){
        console.log(err)
        res.render("Events/event_list"), {
            title: "Error!",
            error: err
        }
    }
});

// Create
router.get("/events/addevent", async(req, res, next) => {
    try{
        res.render("Events/add", {
            title: "Add a Book"
        })

    } catch(err) {
        console.log(err)
        res.render("Events/add", {
            title: "Edit Book",
            error: err
        })
    }
})

router.post("/events/addevent", async(req, res, next) => {
    try{
        let newEvent = event({
            "eventName":        "",
            "eventStart":       "",
            "eventEnd":         "",
            "eventDescription": ""     
        })
        await event.create(newEvent) // Dependent on the newEvent, await
        res.redirect("/events")

    } catch(err) {
        console.log(err)
        res.render("Events/add", {
            title: "Error!",
            error: err
        })
    }
})
// Edit

// Delete


module.exports = router;