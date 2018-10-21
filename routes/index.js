const express    = require("express"),
      stripe     = require("stripe")("sk_test_LfjMRpelxPrAsDYkVm6PqqER"),
      Product    = require("../models/Product"),
      User       = require("../models/User"),
      Order      = require("../models/Order"),
      isLoggedIn = require("../helpers/isLoggedIn"),  
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

router.get("/myOrder", isLoggedIn, (req, res) => {
    Order.find({userID: req.user._id}, (err, order) => {
        if(err) throw err;
        else{
            if(!order.length){
                res.render("ecommerce/myOrder");
            }else{
                let userOrder = [];
                for(let i = 0; i < order.length; i++){
                    userOrder.push({
                        id: order[i]._id,
                        user: order[i].user,
                        price: order[i].order[i].price,
                        order: order[i].order,
                        
                    });  
                    let sumPrice = 0; 
                    for(let i2 = 0; i2 < order[i].order.length; i2++){
                        sumPrice += (order[i].order[i2].price * order[i].order[i2].quantity);
                    }

                    userOrder[i].totalPrice = sumPrice;
                    let str = String(order[i].createdAt);
                    userOrder[i].time = str.slice(0, str.indexOf("GMT"));
                }              
                
                res.render("ecommerce/myOrder", {userOrder: userOrder});
            }
        }
    });
});

router.post("/myOrder", isLoggedIn, (req, res) => {
    if(req.body === {}){
        return;
        //res.redirect("/allProducts");
    }else{
        const newOrder = new Order({
            userID: req.user._id,
            user: {
                name: req.user.name,
                address: req.user.address,
                email: req.user.email
            },
            order: req.body
        });
        newOrder.save((err, order) => {
            if(err) throw err;
            else{
                order.orderTime = order.createdAt;
                //console.log(order);
                res.redirect("/myOrder");
            }
        });
    }
});

router.post("/submitOrder", (req, res) => {
    const token = request.body.stripeToken; 

    const charge = stripe.charges.create({
    amount: req.body.chargeForOrder,
    currency: 'usd',
    description: 'Example charge',
    source: token,
    }, function(err, charge){
        if(err){
            console.log("Your Card Was Declined");
        }else{
            console.log("Success");
            res.redirect("/paySuccess");
        }
    });
});

router.delete("/removeOrder/:id", (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if(err) throw err;
        else{
            order.remove(() => {
                req.flash("info_msg", "You Have Successfully Removed an Order");
                res.redirect("/myOrder");
            });
        }
    });
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
