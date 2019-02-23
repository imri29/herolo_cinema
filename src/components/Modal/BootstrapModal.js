import React from 'react';

// component
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

const BootstrapModal = ({ show, onHide, children }) => {
  return (
    <Modal show={show} onHide={onHide}>
      {children}
    </Modal>
  );
};

export default BootstrapModal;
