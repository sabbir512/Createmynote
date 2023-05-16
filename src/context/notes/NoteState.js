import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Gets All Notes.
  const getNotes = async () => {
    //TODO API Call

  }
  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO API Call
    console.log("Adding a new note")
    const note = {
      "_id": "645f709639f2b13ba7e5abe9q9",
      "user": "645e47c9c5aa23f22d8347443",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-13T11:12:22.270Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
    // setNotes
  }

  //Delete a note
  const deleteNote = (id) => {
    //TODO API Call
    console.log("deleting the note with id" + id);
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }


  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call;


    //Logic to edit in client

  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</noteContext.Provider>
  )
}


export default NoteState;