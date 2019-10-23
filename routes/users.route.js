const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();

router.get('/current', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

router.post('/', async(req, res) => {
    //validating what is in the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find if ther exists the user already
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("El usuario ya se encuentra registrado.");

    user = new User({
        name: req.body.name,
        email: req.body.email
    });
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
        _id: user._id,
        name: user.name,
        email: user.email
    });
});

module.exports = router;