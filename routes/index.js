const express    = require("express"),
      isLoggedIn = require("../helpers/isLoggedIn");  
      router     = express.Router();



router.get("/", isLoggedIn, (req, res) => {
    res.render("ecommerce/index");
});

module.exports = router;
