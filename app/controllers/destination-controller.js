/* globals require */
"use strict";

module.exports = function(data) {
    return {
        getDestination(req, res) {
            res.render("../views/create-destination.pug", {})
        },
        addDestionation(req, res) {
            let title = req.body.name;
            let description = req.body.description;
            let imagePath = req.body.imagePath;

            data.createDestination(title, description, imagePath)
                .then((destination) => {
                    console.log(destination);
                    let id = destination._id;
                    res.redirect(id);
                })
                .catch((error) => {

                })
        },

        allDestinations(req, res) {
            data.showAllDestinations()
                .then((destinations) => {

                    res.render("../views/all-destinations.pug", { destinations })
                })
        },

        getDestinationById(req, res) {
            let id = req.params.id;
            data.findDestinationById(id)
                .then((destination) => {
                    res.render("../views/single-destination.pug", { destination })
                })
        },

        checkDestination(req, res) {
            let id = req.params.id;
            data.findDestinationById(id)
                .then((destination) => {
                    res.render("../views/user-destination.pug", { destination })
                });
        },

        addComment(req, res) {
            let id = req.params.id;
            let comment = req.body.content;
            return data.addCommentToDestination(id, comment)
                .then(() => {
                    res.redirect("/destinations/" + id);
                })
        }
    }
}