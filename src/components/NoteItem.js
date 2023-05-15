import React from 'react'

function NoteItem(props) {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card">
                <div className="card-body my-3">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2"></i>
                        <i className="fa-solid fa-user-pen max-2"></i>
                    </div>
                    <div className="card-header">{note.date}</div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
