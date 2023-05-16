import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get All Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZTQ3YzljNWFhMjNmMjJkODM0NzQ0In0sImlhdCI6MTY4Mzk2MTEzMn0.QALRzJQtmDNHrawpJEsiUrQ9qGXMT_NfbCHNZKjPbR8"
      }
    });
    const json = await response.json();
    console.log(json);
     setNotes(json)
  }


  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZTQ3YzljNWFhMjNmMjJkODM0NzQ0In0sImlhdCI6MTY4Mzk2MTEzMn0.QALRzJQtmDNHrawpJEsiUrQ9qGXMT_NfbCHNZKjPbR8"
      },
      body: JSON.stringify({ title, description, tag })
    });

    //Logic to add note in client side
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
    // setNotes
    setNotes(notes.concat(note));
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
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZTQ3YzljNWFhMjNmMjJkODM0NzQ0In0sImlhdCI6MTY4Mzk2MTEzMn0.QALRzJQtmDNHrawpJEsiUrQ9qGXMT_NfbCHNZKjPbR8"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</noteContext.Provider>
  )
}

export default NoteState;
