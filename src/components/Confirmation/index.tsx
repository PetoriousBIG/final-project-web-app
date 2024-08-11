import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';

const Confirmation = ({show, handleClose, handleDelete}) => {
    const [buttonEnabled, setButtonEnabled] = useState(false)

    return (
      <Modal show={show} 
             onHide={handleClose}
             backdrop="static">
        <Modal.Header>
            <Modal.Title>Warning: Permanent Action!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
              You are about to permanently delete your restaurant.
              Check the box below to enable deletion:
            </p>
            <input type="checkbox" id='delete-confirm'
              defaultChecked={buttonEnabled} onChange={e => setButtonEnabled(e.target.checked)}/>
        </Modal.Body>
        <Modal.Footer>
            <button className='btn btn-primary' onClick={handleClose}>
                Get me out of here!
            </button>
            <button className='btn btn-danger' onClick={handleDelete} disabled={!buttonEnabled}>
                Yes, delete my restaurant.
            </button>
        </Modal.Footer>
      </Modal>
    )
}

export default Confirmation;