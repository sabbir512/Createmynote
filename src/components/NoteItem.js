import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card">
                <div className="card-body my-3">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successsfully", "success");}}></i>
                        <i className="fa-solid fa-user-pen max-2" onClick={()=>{updateNote(note);}}></i>
                    </div>
                    <div className="card-header">{note.date}</div>
                    <p className="card-text">{note.description}</p>
                    {/* <p className="card-text">{note.tag}</p> */}

                </div>
            </div>
        </div>
    )
}

export default NoteItem
