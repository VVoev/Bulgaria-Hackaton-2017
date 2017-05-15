/* eslint-disable no-process-env*/
let path = require("path");
let rootPath = path.normalize(path.join(__dirname, "/../../"));

module.exports = {
    development: {
        rootPath,
        db: {
            local: "mongodb://localhost/national-tourist-sites",
            cloud: "mongodb://admin:admin@ds137291.mlab.com:37291/tourism-db"
        },
        port: process.env.PORT || 3002
    },
    production: {
        rootPath,
        db: { cloud: "mongodb://admin:admin@ds137291.mlab.com:37291/tourism-db" },
        port: process.env.PORT || 3002
    }
};