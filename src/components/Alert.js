import React from 'react'

function Alert(props) {
    return (
        <div>
            <div className="alert alert-primary" role="alert">
                <strong>{props.message}</strong>
            </div>

        </div>
    )
}

export default Alert

