const Order = require("../models/Order.model");
const User = require("../models/User.model");
const Item = require("../models/Item.model");

async function createOrder(id, items) {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("Not logged in!");
    }

    const itemIds = items.map(x => x.id);

    const dbItems = await Item.find({
        _id: {
            $in: itemIds
        }
    });

    let total = 0;

    for (const item of dbItems) {

        total += item.price * items.find(x => x.id == item.id).quantity;
    }

    const listItems = items.map(x => {
        return {
            item: x.id,
            quantity: x.quantity
        }
    });

    const order = new Order({
        user: id,
        items: listItems,
        total,
        address: user.address,
        
    });

    await order.save();

    user.orders.push(order.id);
    await user.save();

    return order;
}

async function previewOrder(id, items) {
    console.log(items);
    
    const user = await User.findById(id);

    if (!user) {
        throw new Error("Not logged in!");
    }

    const itemIds = items.map(x => x.id);

    const dbItems = await Item.find({
        _id: {
            $in: itemIds
        }
    });

    let total = 0;

    for (const item of dbItems) {
        total += item.price * items.find(x => x.id == item.id).quantity;
    }

    const listItems = items.map(x => {
        return {
            item: x.id,
            quantity: x.quantity
        }
    });

    const order = new Order({
        user: id,
        items: listItems,
        total,
        address: user.address
    });

    const popd = await order.populate({
        path: "items",
        populate: {
            path: "item",
            ref: "Item"
        }
    })

    return popd;
}


async function readOrder(id) {
    const order = await Order.findById(id).populate({
        path: "items",
        populate: {
            path: "item",
            ref: "Item"
        }
    });

    return order;
}

async function updateOrder(id, body) {
    await Order.findByIdAndUpdate(id, body);
}

async function readOrders() {
    const orders = await Order.find();

    return orders;
}

module.exports = { createOrder, readOrder, updateOrder, previewOrder, readOrders };