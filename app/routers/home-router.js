"use strict";

module.exports = function(server, controller) {
    server.get("/home", controller.homePage);
    server.get("", controller.homePage);
    server.get("/search",controller.search)
};