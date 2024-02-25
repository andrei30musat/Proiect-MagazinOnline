const Item = require("../models/Item.model");

async function createItem(body) {
    const item = new Item(body);

    try {
        await item.save();

        return item;
    } catch (error) {
        throw new Error(error);
    }
}

async function updateItem(id, body) {
    await Item.findByIdAndUpdate(id, body);
}

async function deleteItem(id) {
    await Item.findByIdAndDelete(id);
}

async function readItem(id) {
    const item = await Item.findById(id);

    return item;
}

async function readItems() {
    const items = await Item.find();

    return items;
}

module.exports = {createItem, updateItem, deleteItem, readItem, readItems};