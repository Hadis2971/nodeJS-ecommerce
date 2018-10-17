const express = require("express"),
      router  = express.Router();

router.get("/", (req, res) => {
    res.render("ecommerce/index");
});

module.exports = router;
