import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "Madhuri",
        "class": "8b"
    }

    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Sabbir",
                "class": "12b"
            });
        }, 5000)
    }
    return (
        <noteContext.Provider value={{ state, update }}>{props.children}</noteContext.Provider>
    )
}

export default NoteState;