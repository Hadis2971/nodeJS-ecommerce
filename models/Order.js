const mongoose  = require("mongoose");
const timeStamp = require("mongoose-timestamp");
const Schema    = mongoose.Schema;

const orderSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    user: {
        name: {
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
        }
    },
    order: {
        type: [{title: String, platform: String, price: String, quantity: Number}],
        required: true
    }
});
orderSchema.plugin(timeStamp);

const Order = module.exports = mongoose.model("Order", orderSchema);