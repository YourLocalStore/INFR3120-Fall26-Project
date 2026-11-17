let mongoose = require('mongoose')

let eventsModel = mongoose.Schema({
    eventName: String,
    eventStart: String,
    eventEnd: String,
    eventDescription: String,
},
{
    Collection: "events"
});

module.exports = mongoose.model("Event", eventsModel)