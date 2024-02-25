const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createUser(email, password, username) {
    password = bcrypt.hashSync(password);

    const user = new User({email, password, role: "user", username});

    try {
        await user.save();

        return user;
    } catch (error) {
        throw new Error(error);
    }
}

async function createAdmin(email, password, username) {
    password = bcrypt.hashSync(password);

    const user = new User({email, password, role: "admin", username});

    try {
        await user.save();

        return user;
    } catch (error) {
        throw new Error(error);
    }
}

async function loginUser(email, password) {
    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new Error("Incorrect email or password!");
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error("Incorrect email or password!");
    }

    const token = jwt.sign({email}, "MYSECRETKEY");

    return token;
}

async function updateUser(id, body) {
    await User.findByIdAndUpdate(id, body);
}

async function deleteUser(id) {
    await User.findByIdAndDelete(id);
}

async function readUser(id) {
    const user = await User.findById(id);

    return user;
}

async function readUsers() {
    const users = await User.find();

    return users;
}

module.exports = {createUser, updateUser, deleteUser, readUser, readUsers, loginUser, createAdmin};