const express = require("express");
const { verifyAdmin, verifyLoggedIn } = require("../middlewares/auth");
const { readItem, readItems, createItem, updateItem, deleteItem } = require("../services/ItemService");

const itemRouter = express.Router();

itemRouter.get("/item/:id", async (req, res) => {
    try {
        const item = await readItem(req.params.id);

        return res.status(200).send(item);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

itemRouter.get("/items", async (req, res) => {
    try {
        const items = await readItems();

        return res.status(200).send(items);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

itemRouter.post("/item", [verifyLoggedIn, verifyAdmin],  async (req, res) => {
    try {
        const createdItem = await createItem(req.body);

        return res.status(201).send(createdItem);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

itemRouter.put("/item/:id", [verifyLoggedIn, verifyAdmin], async (req, res) => {
    try {
        await updateItem(req.params.id, req.body);

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

itemRouter.delete("/item/:id", [verifyLoggedIn, verifyAdmin], async (req, res) => {
    try {
        await deleteItem(req.params.id);

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = itemRouter;