const mongoose = require('mongoose');
const Item = require('../models/item');

mongoose.connect('mongodb://127.0.0.1:27017/inventory-db')
    .then(() => {
        console.log('Connection Open');
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    });

const seedDb = async () => {
    const items = [
        {
            name: 'Smartphone',
            category: 'Electronics',
            quantity: 30,
            price: 20000,
            description: 'Latest model smartphone with 8GB RAM and 256GB storage.'
        },
        {
            name: 'Laptop',
            category: 'Electronics',
            quantity: 10,
            price: 55000,
            description: 'High-performance laptop with 16GB RAM and 512GB SSD.'
        },
        {
            name: 'Headphones',
            category: 'Accessories',
            quantity: 15,
            price: 1000,
            description: 'Wireless headphones.'
        },
        {
            name: 'Mouse',
            category: 'Accessories',
            quantity: 50,
            price: 700,
            description: 'Wireless mouse with ergonomic design and 1600 DPI.'
        },
        {
            name: 'Smartwatch',
            category: 'Wearables',
            quantity: 20,
            price: 5000,
            description: 'A wearable smart device.'
        }
    ];

    await Item.insertMany(items);
    console.log('Items inserted!');
};

seedDb().then(() => {
    mongoose.connection.close();
});
