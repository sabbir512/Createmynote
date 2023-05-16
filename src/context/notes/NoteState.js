import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
const notesInitial = [
    {
      "_id": "645f709639f2b1ba71e5abe99",
      "user": "645e47c9c5aa23f22d834744",
      "title": "My Title",
      "description": "Hi i am sabbir and this is my first description in this app",
      "tag": "personal",
      "date": "2023-05-13T11:12:22.270Z",
      "__v": 0
    } ,
    {
      "_id": "645f709639f2b1ba7ew5abe99",
      "user": "645e47c9c5aa23f22d834744",
      "title": "My Title",
      "description": "Hi i am sabbir and this is my first description in this app",
      "tag": "personal",
      "date": "2023-05-13T11:12:22.270Z",
      "__v": 0
    },
     {
      "_id": "645f709639f2b1ba7e5qabe99",
      "user": "645e47c9c5aa23f22d834744",
      "title": "My Title",
      "description": "Hi i am sabbir and this is my first description in this app",
      "tag": "personal",
      "date": "2023-05-13T11:12:22.270Z",
      "__v": 0
    },
    {
        "_id": "645f709639f2b1bad7e5abe99",
        "user": "645e47c9c5aa23f22d834744",
        "title": "My Title",
        "description": "Hi i am sabbir and this is my first description in this app",
        "tag": "personal",
        "date": "2023-05-13T11:12:22.270Z",
        "__v": 0
      },
      {
        "_id": "645f709639f2b1bda7e5abe99",
        "user": "645e47c9c5aa23f22d834744",
        "title": "My Title",
        "description": "Hi i am sabbir and this is my first description in this app",
        "tag": "personal",
        "date": "2023-05-13T11:12:22.270Z",
        "__v": 0
      },
      {
        "_id": "645f709639f2b1asba7e5abe99",
        "user": "645e47c9c5aa23f22d834744",
        "title": "My Title",
        "description": "Hi i am sabbir and this is my first description in this app",
        "tag": "personal",
        "date": "2023-05-13T11:12:22.270Z",
        "__v": 0
      },
      {
        "_id": "645f709639f2b13ba7e5abe99",
        "user": "645e47c9c5aa23f22d834744",
        "title": "My Title",
        "description": "Hi i am sabbir and this is my first description in this app",
        "tag": "personal",
        "date": "2023-05-13T11:12:22.270Z",
        "__v": 0
      }
  ]
  const [notes, setNotes] = useState(notesInitial)

  //Add a note
  const addNote = (title, description, tag)=>{
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
  }
  //Delete a note
  const deleteNote = (id)=>{

  }
  //Edit a note
  const editNote = (id)=>{

  }
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>{props.children}</noteContext.Provider>
    )
}

export default NoteState;