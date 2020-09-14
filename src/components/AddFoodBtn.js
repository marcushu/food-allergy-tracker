import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function AddFoodBtn({ _text, record, update }) {
  const [showModal, setShowModal] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentRecord, setCurrentRecord] = useState("");

  return (
    <>
      <button
        className="plusButton"
        onClick={() => {
          setCurrentText(_text)
          setCurrentRecord(record);
          setShowModal(true);
        }}>+</button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: "rgb(8, 99, 78)", color: "white" }}>
          <Modal.Title>Enter Foods</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={currentText}
            onChange={e => setCurrentText(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowModal(false);
            update(currentText, currentRecord)
          }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

AddFoodBtn.prototypes = {
  _text: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}