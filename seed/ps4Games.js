const mongoose = require("mongoose");
const Product  = require("../models/Product");

mongoose.connect("mongodb://localhost:27017/nodeJS-ecommerece", { useNewUrlParser: true });

const products = [
    new Product({
        title: "Batman Arkham City",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "Ps4",
        price: 25,
        coverImage: "/images/games/ps4/batman.jpg",
    }),
    new Product({
        title: "Dark Souls",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "Ps4",
        price: 45,
        coverImage: "/images/games/ps4/dark.png",
    }),
    new Product({
        title: "Resident Evil VII",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "Ps4",
        price: 85,
        coverImage: "/images/games/ps4/evil.jpg",
    }),
    new Product({
        title: "Metal Gear Solid V",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "Ps4",
        price: 95,
        coverImage: "/images/games/ps4/metal.jpg",
    }),
    new Product({
        title: "Mortal Kombat X",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "Ps4",
        price: 80,
        coverImage: "/images/games/ps4/mortal.jpg",
    }),
    new Product({
        title: "Street Fighter V",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique magna mauris, eu pharetra justo aliquet sed. Vestibulum convallis diam sit amet augue luctus ultricies. Cras sagittis volutpat nisi quis dignissim. Nunc blandit mi eget arcu dictum, ut euismod mi sodales. ",
        platform: "Ps4",
        price: 70,
        coverImage: "/images/games/ps4/street.jpg",
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