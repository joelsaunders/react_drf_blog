import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(event) => event.stopPropagation()} className="ui standard modal visible active">
                <div className="content">{props.children}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
};

export default Modal
