const User = require('../models/User')
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Tusharisaplayb$oy'

//Route1: Create a User using: POST "/api/auth/createuser". Dosen't required auth. No login require

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
        //Generating salt with bcryptjs for secture password.
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "This email already used"})});

        //create an object name data.
        const data = {
            user: {
                id: user.id
            }
        }

        //creating jwt data and secret for passwor-token. for authentication.
        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user)
        res.json({ authtoken });  //ES6
        //catch error
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})



//Route2: Authenticate a User using: POST "/api/auth/login". Dosen't required auth. No login require
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "password cannot be blank").exists(),
], async (req, res) => {
    //for checking errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //using destacturing method to exact email password
    const { email, password } = req.body
    //using try catch to check user whether exist or not
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return req.body.status(400).json({ error: "please login with correct credentians" });
        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return req.body.status(400).json({ error: "please login with correct credentians" });
        }
        //if data is match then payload will be load user data
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports = router