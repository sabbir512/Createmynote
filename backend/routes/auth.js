const User = require('../models/User')
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using: POST "/api/auth/createuser". Dosen't required auth. No login require

router.post('/createuser', [
    body('name', "Enter a valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be 5 characters").isLength({ min: 5 })
], async (req, res) => {
    //if there is errors return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the users or email exists already
    try {
        //using try catch method so if goes anything wrong than we can get and fix it.

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "This email already exist" })
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })

        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "This email already used"})});


        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }
})

module.exports = router