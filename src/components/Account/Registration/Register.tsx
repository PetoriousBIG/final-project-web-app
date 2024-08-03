import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as client from "../client";
import { setCurrentUser } from '../reducer';
import { useDispatch } from 'react-redux';
function Register({ show, handleClose }) {
  
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleRegister = async () => {
      try {  
          const currentUser = await client.signup(user);
          dispatch(setCurrentUser(currentUser));      
      } catch (err: any) {
        setError(err.response.data.message);
      };
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="register-modal">
      <Modal.Header closeButton>
        <Modal.Title>Sign up now</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-md-6 mb-4">
              <Form.Group controlId="form3Example1" className="form-outline">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" value={user.firstName} onChange={(e) => (
                    setUser({...user, firstName: e.target.value})
                )}/>
              </Form.Group>
            </div>
            <div className="col-md-6 mb-4">
              <Form.Group controlId="form3Example2" className="form-outline">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" value={user.lastName} onChange={(e) => (
                    setUser({...user, lastName: e.target.value})
                )}/>
              </Form.Group>
            </div>
          </div>
          <Form.Group controlId="form3Example3" className="form-outline mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={user.email} onChange={(e) => (
                 setUser({...user, email: e.target.value})
            )}/>
          </Form.Group>
          <Form.Group controlId="form3Example4" className="form-outline mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={user.password} onChange={(e) => (
                setUser({...user, password: e.target.value})
            )}/>
          </Form.Group>
          <Form.Group controlId="form3Example5" className="form-outline mb-4">
            <Form.Label>Choose your role</Form.Label>
            <Form.Control as="select" value={user.role} onChange={(e) => (
                setUser({...user, role: e.target.value})
            )}>
              <option>User</option>
              <option>Chef</option>
              <option>Owner</option>
            </Form.Control>
          </Form.Group>
          
          <Button variant="primary" type="button" className="btn btn-block mb-4" onClick={handleRegister}>
            Sign up
          </Button>
         
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Register;