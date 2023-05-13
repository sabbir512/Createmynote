const express = require('express');
const Notes = require('../models/Notes')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get All The Notes using: GET "/api/notes/fetchallnotes". Login Required

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

//Route 2: Add a New Note using: POST "/api/notes/addnote". Login Required

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
});

//Route 3: Update An Existing  Note using: PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create new Note object
    try {

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        //Find the note to be updated and update it.
        let note = await Notes.findById(req.params.id);
        //if note not founded
        if (!note) { return res.status(404).send("Not Founded") };
        //for check user valid or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Illegal Activites")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
});

//Route 4: Deleteing an  Existing  Note using: DELETE "/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //Find the note to be deleted and delete it.
        let note = await Notes.findById(req.params.id);
        //if note not founded
        if (!note) { return res.status(404).send("Not Founded") };
        //Allow Deletion only if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Illegal Activites")
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
});

module.exports = router