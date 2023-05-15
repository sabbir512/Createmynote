import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
const notesInitial = [
    {
      "_id": "645f709639f2b1ba7e5abe99",
      "user": "645e47c9c5aa23f22d834744",
      "title": "My Title",
      "description": "Hi i am sabbir and this is my first description in this app",
      "tag": "personal",
      "date": "2023-05-13T11:12:22.270Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)

    return (
        <noteContext.Provider value={{notes, setNotes}}>{props.children}</noteContext.Provider>
    )
}

export default NoteState;