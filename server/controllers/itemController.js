const mongoose = require('mongoose');
const Item = require('../../models/item');

mongoose.connect('mongodb://127.0.0.1:27017/inventory-db')
    .then(() => {
        console.log('Connection Open');
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

//List of all items with pagination
exports.items = async (req, res) => {
    const perPage = 5;
    const page = parseInt(req.query.page) || 1;

    const totalItems = await Item.countDocuments({});
    const items = await Item.find({})
        .skip((page - 1) * perPage)
        .limit(perPage);

    res.render('index', {
        paginatedItems: items,
        currentPage: page,
        totalPages: Math.ceil(totalItems / perPage)
    });
};

//Add Item Form
exports.addItemForm = (req,res) => {
    res.render('add-item');
}

//Create Item
exports.addItem = async (req,res) => {
    const item = new Item(req.body);
    await item.save();
    res.redirect('/items');
}

//View Specific Item
exports.viewItem = async (req,res) => {
    const item = await Item.findById(req.params.id);
    res.render('show-item', {item});
}

//Update Item Form
exports.editItemForm = async (req,res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit-item', {item});
}

//Update Item 
exports.updateItem = async (req, res) => {
    const { name, category, price, quantity, description } = req.body;

    if (!name || !category || !price ) {
        return res.status(400).send('All fields are required.');
    }

    const { id } = req.params;
    await Item.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/items/${id}`);
};


//Delete Item Form
exports.deleteItemForm = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('delete-item', { item });
};

// Delete Item
exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/items');
};
