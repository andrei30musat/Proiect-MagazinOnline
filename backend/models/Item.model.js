const mongoose = require("mongoose");

const itemModel = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    picture: {
        type: mongoose.SchemaTypes.String
    },
    tags: [
        {
            type: mongoose.SchemaTypes.String
        }
    ],
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
});

const Item = mongoose.model("Item", itemModel);

module.exports = Item;