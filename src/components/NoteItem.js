import React from 'react'

function NoteItem(props) {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div class="card">
                <div class="card-body my-3">
                    <h5 class="card-title">{note.title}</h5>
                    <div class="card-header">{note.date}</div>
                    <p class="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
