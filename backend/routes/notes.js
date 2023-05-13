const express = require('express');
const Notes = require('../models/Notes')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get All The Notes using: GET "/api/notes/fetchallnotes".

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {


        //user: req.user.id because in fetchuser our user is req.user
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

//Route 1: Add a New Note using: POST "/api/notes/addnote".

router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description should be atleast 5 chacacters").isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        //if there is errors return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //destuacturing and take out those onject
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        //using for saving notes
        const saveNotes = await note.save()
        res.json(saveNotes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports = router