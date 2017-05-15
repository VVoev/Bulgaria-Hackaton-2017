/* globals require module */

const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    friends: {
        type: Array,
    },
    challengedFriends: {
        type: Array,
    },
    combat: {
        type: Boolean,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    destinations: {
        type: Array,
        required: true
    },
    comments: [{}]
});

schema
    .virtual("fullName")
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    });

schema.query.byName = function (name) {
    let query = {"username": new RegExp(name, "i")};
    return this.find(query);
};

schema.methods.comparePassword = function (password) {
    return this.password === password;
};

mongoose.model("User", schema);

module.exports = mongoose.model("User");