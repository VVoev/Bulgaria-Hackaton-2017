/* globals require */

let express = require("express"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    helmet = require("helmet"),
    logger = require("morgan"),
    flash = require("connect-flash-plus"),
    roles = require("./roles"),
    MongoDBStore = require("connect-mongodb-session")(session),
    path = require("path"),
    filter = require("content-filter");

// eslint-disable-next-line
module.exports = (app, config) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    let sessionStorage = new MongoDBStore({
        uri: config.db.cloud,
        collection: "userSessions"
    });

    app.use(session({
        secret: "secret",
        store: sessionStorage,
        resave: true,
        saveUninitialized: true
    }));

    app.set("views", path.join(config.rootPath, "app/views/"));
    app.set("view engine", "pug");
    app.use("/public", express.static(path.join(config.rootPath, "public")));
    app.set("view options", { layout: false });

    app.use(logger("dev"));

    require("../config/passport/")(app);

    app.use(helmet());
    app.use(filter());
    app.use(roles.middleware());
    // Connect Flash
    app.use(flash());

    // Global Vars
    app.use((req, res, next) => {
        res.locals.successMessage = req.flash("successMessage");
        res.locals.errorMessage = req.flash("errorMessage");
        res.locals.error = req.flash("error");
        next();
    });

    const User = require("../models/user-model");
    const Destination = require("../models/destination-model");
    const data = require("../data")({ User,Destination });
    const controllers = require("../controllers")(data);

    require("../routers")(app, controllers);
    require("../config/mongoose")(config);

    app.use((req, res, next) => {
        let err = new Error("We can't seem to find the page you are looking for!");
        err.status = 404;
        next(err);
    });

    // error handler
    // eslint-disable-next-line
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        if (req.app.get("env") === "development") {
            res.locals.error = err;
        } else {
            res.locals.error = {};
        }

        res.status(err.status || 500);
        res.render("error");
    });
};