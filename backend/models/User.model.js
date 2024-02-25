const mongoose = require("mongoose");
const validator = require("validator");

const userModel = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        validate: (e) => validator.isEmail(e),
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    orders: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Order'
        }
    ],
    role: {
        type: mongoose.SchemaTypes.String
    },
    address: {
        type: mongoose.SchemaTypes.String,
        default: ""
    }
});

const User = mongoose.model("User", userModel);

module.exports = User;