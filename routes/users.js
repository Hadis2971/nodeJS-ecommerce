const express  = require("express"),
      User     = require("../models/User"),
      bcrypt   = require("bcryptjs"),
      mongoose = require("mongoose"),
      crypto   = require("crypto"),
      multer   = require("multer"),
      GridFsStorage = require("multer-gridfs-storage"),
      Grid = require("gridfs-stream"),
      path = require("path"),
      router  = express.Router();

const mongoURI = "mongodb://localhost:27017/nodeJS-ecommerece";

var storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
            return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
            filename: filename,
            bucketName: 'profileImages'
            };
            resolve(fileInfo);
        });
        });
    }
});
const upload = multer({ storage });

let gfs;
var conn = mongoose.createConnection(mongoURI);
conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection(mongoURI);  
});

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.get("/logout", (req, res) => {

});


router.post("/register", upload.single("profileImage"), (req, res) => {
    req.checkBody("name", "The Name Field is Required!!!").notEmpty();
    req.checkBody("username", "The Username Field is Required!!!").notEmpty();
    req.checkBody("email", "The Email Field is Required!!!").notEmpty();
    req.checkBody("password", "The Password Field is Required!!!").notEmpty();
    req.checkBody("email", "Please Enter a Valid Email Address!!!").isEmail();
    req.checkBody("password2", "The Passwords Must Match!!!").equals(req.body.password);

    const errors = req.validationErrors();

    if(errors){
        res.render("auth/register", {errors: errors});
    }else{
        User.findOne({email: req.body.email}, (err, mail) => {
            User.findOne({username: req.body.username}, (err, name) => {
                if(mail || name){
                    res.render("auth/register", {
                        mail: mail,
                        name: name
                    });
                }else{
                    const newUser = new User({
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        profileImage: req.file.filename
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            else{
                                newUser.password = hash;
                                newUser.save((err, user) => {
                                    if(err) throw err;
                                    else{
                                        console.log(user);
                                        req.flash("success_msg", "You Are Now Registred And Can Login");
                                        res.redirect("/users/login");
                                    }
                                });
                            }
                        });
                    });
                }
            });
        });
    }
});

module.exports = router;