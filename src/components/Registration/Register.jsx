import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Register({ show, handleClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'User'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="register-modal">
      <Modal.Header closeButton>
        <Modal.Title>Sign up now</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <Form.Group controlId="form3Example1" className="form-outline">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-4">
              <Form.Group controlId="form3Example2" className="form-outline">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group controlId="form3Example3" className="form-outline mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="form3Example4" className="form-outline mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="form3Example5" className="form-outline mb-4">
            <Form.Label>Choose your role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option>User</option>
              <option>Chef</option>
              <option>Owner</option>
            </Form.Control>
          </Form.Group>
          
          <Button variant="primary" type="submit" className="btn btn-block mb-4">
            Sign up
          </Button>
         
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Register;