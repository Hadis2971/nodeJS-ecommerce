const express  = require("express");
const exphbs   = require("express-handlebars");
const session  = require("express-session");
const mongoose = require("mongoose");
const flash    = require("connect-flash");
const path     = require("path");
const cookieParser     = require("cookie-parser");
const expressValidator = require("express-validator");

mongoose.connect("mongodb://localhost:27017/nodeJS-ecommerece", { useNewUrlParser: true });

const app  = express();
const port = (process.env.port || 5000);

const usersRouter = require("./routes/users");

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({defaultLayout: "layout"}));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(expressValidator());

app.use(session({
    secret: "xxxYYYzzz",
    saveUninitialized: true,
    resave: false
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg   = req.flash("error_msg");
    res.locals.error    = req.flash("error");
    res.locals.info_msg = req.flash("info_msg");

    next();
});

app.use("/users", usersRouter);

app.use((req, res, next) => {
    res.status(404);
    res.render("errorViews/404", {layout: "errorLayout"});
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.render("errorViews/500", {layout: "errorLayout"});
});

app.listen(port, () => {`App Sarted On Port ${port}`});