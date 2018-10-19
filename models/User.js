const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", userSchema);

module.exports.comparePaswords = function(password, hash, cb){
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err;
        else{
            cb(null, isMatch);
        }
    });
}
