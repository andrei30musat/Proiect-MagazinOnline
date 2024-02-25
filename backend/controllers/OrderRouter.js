const express = require("express");
const { verifyUser, verifyLoggedIn, verifyAdmin } = require("../middlewares/auth");
const { createOrder, readOrder, updateOrder, previewOrder, readOrders } = require("../services/OrderService");

const orderRouter = express.Router();

orderRouter.post("/order", [verifyLoggedIn, verifyUser], async (req, res) => {
    try {
        const order = await createOrder(req.user.id, req.body.items);

        return res.status(201).send(order);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

orderRouter.get("/orders", [verifyLoggedIn, verifyAdmin], async (req, res) => {
    try {
        const orders = await readOrders();

        return res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

orderRouter.post("/order/preview", [verifyLoggedIn, verifyUser], async (req, res) => {
    try {
        const order = await previewOrder(req.user.id, req.body.items);

        return res.status(200).send(order);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

orderRouter.get("/order/:id", [verifyLoggedIn], async (req, res) => {
    try {
        const order = await readOrder(req.params.id);

        return res.status(200).send(order);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


orderRouter.put("/order/:id", [verifyLoggedIn, verifyAdmin], async (req, res) => {
    try {
        await updateOrder(req.params.id, req.body);

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = orderRouter;