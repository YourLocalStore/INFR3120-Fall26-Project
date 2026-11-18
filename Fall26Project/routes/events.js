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
        let newEvent = event({
            "eventName":        req.body.eName,
            "eventType":        req.body.eType,
            "eventStart":       req.body.eStartDate,
            "eventEnd":         req.body.eEndDate,
            "eventDescription": req.body.eDescription     
        })
        await event.create(newEvent) // Dependent on the newEvent, await
        res.redirect("/events")

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
            "_id":              eventID,
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