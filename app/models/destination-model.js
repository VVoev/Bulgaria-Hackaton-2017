/* mongoose global */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    commentSchema = require("./commentschema");


let DestinationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        // required: true
        default: "../public/uploads/default-nature.jpg"
    },
    location: {
        type: String,
    },
    comments: [commentSchema],
    isVisited: {
        type: Boolean,
        default: false
    },
    workingTime: {
        type: String,
        required: false,
    }
});


let Destination;
mongoose.model("Destination", DestinationSchema);
Destination = mongoose.model("Destination");
module.exports = Destination;