const express    = require("express"),
      Product    = require("../models/Product"),
      User       = require("../models/User");
      isLoggedIn = require("../helpers/isLoggedIn");  
      router     = express.Router();




router.get("/allProducts", isLoggedIn, (req, res) => {
    Product.find({}, (err, products) => {
        if(err) throw err;
        else{
            res.render("ecommerce/allProducts", {products: products});
        }
    });
});

router.get("/pcGames", isLoggedIn, (req, res) => {
    Product.find({platform: "PC"}, (err, products) => {
        if(err) throw err;
        else{
            res.render("ecommerce/pcGames", {products: products}); 
        }
    });
});

router.get("/ps4Games", isLoggedIn, (req, res) => {
    Product.find({platform: "Ps4"}, (err, products) => {
        if(err) throw err;
        else{
            res.render("ecommerce/pcGames", {products: products}); 
        }
    });
});

router.post("/myOrder", isLoggedIn, (req, res) => {
    console.log(req.body);
    //res.render("ecommerce/myOrder", {order: req.body});
});

router.get("/", isLoggedIn, (req, res) => {
    res.render("ecommerce/index");
});

router.get("/:id", isLoggedIn, (req, res) => {
    User.findOne({_id: req.params.id}, (err, user) => {
        res.render("ecommerce/index", {user: user});
    });
});



module.exports = router;
