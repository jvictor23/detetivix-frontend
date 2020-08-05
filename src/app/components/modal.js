import React from 'react'

const modal = props =>{
    return(
        <div className="modal fade" id={`ModalCentralizado${props.id}`} tabIndex="-1" role="dialog" aria-labelledby="ModalCentralizado" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        {props.children}
                    </div>
                </div>
    )
}

export default modal