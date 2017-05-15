/* globals require */
"use strict";
module.exports = function(data) {
    return {
        homePage(req, res) {
            res.render("home-page");
        },

        search(req, res, next) {
            let searchType = req.query.searchType;
            let searchTerm = req.query.s;
            switch (searchType) {
                case "Users":
                    data.searchUsers(searchTerm)
                        .then(users => {
                            console.log(users);
                            res.render("users", { users });
                        })
                        .catch(err => {
                            res.status(500);
                            next(err, req, res);
                        });
                    break;
                case "Destinations":
                    data.searchDestinations(searchTerm)
                        .then(destinations => {
                            res.render("destinations", { destinations });
                        })
                        .catch((err) => {
                            res.status(500);
                            next(err, req, res);
                        });
                    break;
            }
        }
    };
};