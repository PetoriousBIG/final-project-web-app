import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ReplyComment({ show, handleClose }) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) {
      setError('Please write a comment before submitting.');
      return;
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="reply-comment-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Reply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="reply-comment" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <textarea
              name="comment"
              className="form-control"
              placeholder="Write your Comment*"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            {error && <p className="error-text">{error}</p>}
          </div>
          <div className="modal-footer">
            <Button variant="primary" onClick={handleSubmit} className="btn-submit">
              Post Comment
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ReplyComment;