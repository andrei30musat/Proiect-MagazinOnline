const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./controllers/UserRouter");
const fileRouter = require("./controllers/fileRouter");
const cors = require("cors");

const User = require("./models/User.model");
const { createAdmin } = require("./services/UserService");
const itemRouter = require("./controllers/ItemRouter");
const orderRouter = require("./controllers/OrderRouter");

const app = express();
app.use(express.json());
app.use(express.static('public'))

app.use(cors({
    origin: "http://localhost:3000"
}));

// routers
app.use(userRouter);
app.use(fileRouter);
app.use(itemRouter);
app.use(orderRouter);

app.listen(5000, async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017");

    // seed admin
    const admin = await User.findOne({
        role: "admin"
    });

    if (!admin) {
        await createAdmin("admin@example.com", "admin", "Admin");
        console.log("Seeded admin account");
    }

    console.log("App started on 5000");
});