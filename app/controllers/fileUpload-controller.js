"use strict";

const path = require("path");
const { visited } = require('constants');

module.exports = function(data) {
    return {
        uploadSingleFile(req, res) {
            let destinationImagePath = path.join("/public/uploads", req.file.filename);
            data.findDestinationById(req.params.id)
                .then((destination) => {
                    destination.imagePath = destinationImagePath;
                    destination.save();
                });

            console.log(req.params.id);
            data.visited.push(req.params.id);

            res.redirect("/profile");
        },

        showSingleFileUploadForm(req, res) {
            res.render("../views/upload-single-form.pug", { req });
        }
    };
};