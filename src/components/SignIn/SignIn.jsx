import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Register from '../Registration/Register';

function SignIn({ show, handleClose }) {
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => {
    handleClose();
    setShowRegister(true);
  };

  const handleCloseRegister = () => setShowRegister(false);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered className="sign-in-modal">
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <p>Don't have an account? <button className="link-button" onClick={handleShowRegister}>Register here</button></p>
          </div>
        </Modal.Body>
      </Modal>

      <Register show={showRegister} handleClose={handleCloseRegister} />
    </div>
  );
}

export default SignIn;