module.exports = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("info_msg", "Please Login First!!!");
        res.redirect("/users/login");
    }
}