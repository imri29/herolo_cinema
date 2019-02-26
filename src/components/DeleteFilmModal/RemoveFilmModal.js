import React from 'react';

// components
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RemoveFilmModal = ({ onRemove, onCancel }) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Delete Film</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this film?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onRemove}>
          Delete Film
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveFilmModal;
