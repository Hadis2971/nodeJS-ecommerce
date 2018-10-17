const express = require("express"),
      router  = express.Router();

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.get("/logout", (req, res) => {

});

module.exports = router;