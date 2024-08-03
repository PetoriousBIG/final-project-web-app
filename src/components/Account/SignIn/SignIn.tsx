import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Register from '../Registration/Register';
import * as client from "../client";
import { setCurrentUser } from '../reducer';
import { useDispatch } from 'react-redux';

function SignIn({ show, handleClose }) {
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleShowRegister = () => {
      handleClose();
      setShowRegister(true);
  };

  const handleSignIn = async () => {
      try {
        const currentUser = await client.signin(credentials);
        dispatch(setCurrentUser(currentUser));
        handleClose()
      } catch (err: any) {
        setError(err.response.data.message);
        console.log(error);
      };
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
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => (
                  setCredentials({...credentials, email: e.target.value})
              )} value={credentials.email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => (
                  setCredentials({...credentials, password: e.target.value})
              )} value={credentials.password}/>
            </Form.Group>
            
            <Button variant="primary" type="button" className="w-100" onClick={handleSignIn}>
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