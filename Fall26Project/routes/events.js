let express = require('express');
let router = express.Router();
let mongoose = require("mongoose")

let event = require("../models/event")

// Read all listings from the DB
router.get('/events', async(req, res, next) => {
    try{
        const eventListings = await event.find(); // Await, we are waiting for the Database to query events
        res.render("Events/event_list", {         // Then, render the event_list.ejs file 
            title: "Event List",                  // A title must be defined in EJS
            eventListings: eventListings          // Must also pass our required data into the view template, i.e., eventListings 
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
            title: "Add an Event"
        })

    } catch(err) {
        console.log(err)
        res.render("Events/addevent", {
            title: "Error!",
            error: err
        })
    }
})

router.post("/events/addevent", async(req, res, next) => {
    try{

        // eName, eType, etc., are the names of the form field elements.
        // They get passed into the parameters from the database schema once submitted.
        // 'req.body' is the JSON data that gets passed from these elements.
        let newEvent = event({
            "eventName":        req.body.eName,
            "eventType":        req.body.eType,
            "eventStart":       req.body.eStartDate,
            "eventEnd":         req.body.eEndDate,
            "eventDescription": req.body.eDescription     
        })
        await event.create(newEvent) // Dependent on the newEvent, await for its completion
        res.redirect("/events")      // Send user back to the events page after adding

    } catch(err) {
        console.log(err)
        res.render("Events/addevent", {
            title: "Error!",
            error: err
        })
    }
})
// Edit
router.get("/events/edit/:id", async(req, res, next) => {
    try{

        // req.params requires ":id", which gets obtained from events_list.ejs
        const eventID = req.params.id                       
        const eventToEdit = await event.findById(eventID) 
        res.render("Events/edit", {
            title: "Edit an Event",
            event: eventToEdit
        })

    } catch(err) {
        console.log(err)
        res.render("Events/edit", {
            title: "Error!",
            error: err
        })
    }
})

router.post("/events/edit/:id", async(req, res, next) => {
    try{
        let eventID = req.params.id
        let updatedEvent = event({
            "eventName":        req.body.eName,
            "eventType":        req.body.eType,
            "eventStart":       req.body.eStartDate,
            "eventEnd":         req.body.eEndDate,
            "eventDescription": req.body.eDescription              
        })
        await event.findByIdAndUpdate(eventID, updatedEvent)
        res.redirect("/events")

    } catch(err) {
        console.log(err)
        res.render("Events/edit", {
            title: "Error!",
            error: err
        })
    }
})

// Delete
router.get("/events/delete/:id", async(req, res, next) => {
    try{
        let eventID = req.params.id
        await event.deleteOne({_id:eventID})
        res.redirect("/events")

    } catch(err) {
        console.log(err)
        res.render("Events/delete", {
            title: "Error!",
            error: err
        })        
    }
})


module.exports = router;