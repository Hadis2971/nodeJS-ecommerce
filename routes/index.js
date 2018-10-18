const express    = require("express"),
      User       = require("../models/User");
      isLoggedIn = require("../helpers/isLoggedIn");  
      router     = express.Router();



router.get("/", isLoggedIn, (req, res) => {
    res.render("ecommerce/index");
});

router.get("/:id", isLoggedIn, (req, res) => {
    User.findOne({_id: req.params.id}, (err, user) => {
        res.render("ecommerce/index", {user: user});
    });
});

module.exports = router;
