const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
// auth JWT bcrypt

async function verifyLoggedIn(req, res, next) {
    const authorization = req.get("Authorization");

    if (!authorization) {
        return res.status(403).send("Forbidden");
    }

    try {
        const pld = jwt.verify(authorization, "MYSECRETKEY");

        const user = await User.findOne({
            email: pld.email
        });

        if (!user) {
            return res.status(403).send("Forbidden");
        }

        req.user = user;

        next();
    } catch (e) {
        return res.status(403).send("Forbidden")
    }
}

async function verifyUser(req, res, next) {
    if (req.user.role == "user") {
        next();
    } else {
        return res.status(403).send("Forbidden");
    }
}

async function verifyAdmin(req, res, next) {
    console.log(req.user);

    if (req.user.role == "admin") {
        next();
    } else {
        return res.status(403).send("Forbidden");
    }
}

module.exports = {verifyLoggedIn, verifyUser, verifyAdmin};