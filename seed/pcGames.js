const mongoose = require("mongoose");
const Product  = require("../models/Product");

mongoose.connect("mongodb://localhost:27017/nodeJS-ecommerece", { useNewUrlParser: true });

const products = [
    new Product({
        title: "Call of Duty - Black Ops",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "PC",
        price: 15,
        coverImage: "/images/games/pc/cod.jpg",
    }),
    new Product({
        title: "Fallout 5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "PC",
        price: 45,
        coverImage: "/images/games/pc/fallout.png",
    }),
    new Product({
        title: "GTA V",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "PC",
        price: 85,
        coverImage: "/images/games/pc/gta.jpg",
    }),
    new Product({
        title: "Metro 2033",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "PC",
        price: 25,
        coverImage: "/images/games/pc/metro.jpg",
    }),
    new Product({
        title: "Metro Last Light",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "PC",
        price: 35,
        coverImage: "/images/games/pc/metroLight.jpg",
    }),
    new Product({
        title: "GTA Vice City",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "PC",
        price: 5,
        coverImage: "/images/games/pc/vice.jpg",
    }),
];

function exit(){
    mongoose.disconnect();
}

let done = 0;
for(let i = 0; i < products.length; i++){
    products[i].save(function(){
        done++;
        if(done === products.length){
            exit();
        }
    })
}