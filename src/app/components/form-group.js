import React from 'react';

function formGroup(props) {
    return (
        <div className="form-group row">
            {props.children}
        </div>
    )
}

export default formGroup