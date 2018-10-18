const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    }
});

const Product = module.exports = mongoose.model("Product", productSchema);

