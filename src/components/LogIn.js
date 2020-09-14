import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import db from '../firebaseConfig';
import PropTypes from 'prop-types';

export default function LogIn({
  setUser,
  setDelay,
  setSympLevel,
  setSortOrder
}) {

  const [showModal, setshowModal] = useState(false);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  const login = () => {
    setshowModal(false);

    db.collection("users")
      .where("name", "==", name)   
      .where("password", "==", password)   
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          alert("Nobody found with that user name.");
        } else {
          setUser(snapshot.docs[0].data().name);
          setDelay(snapshot.docs[0].data().delay);
          setSympLevel(snapshot.docs[0].data().filterLevel);
          setSortOrder(snapshot.docs[0].data().sortOrder);
        }
      })
      .catch(err => { console.error(err) });
  }

  const signUp = () => {
    setshowModal(false);

    db.collection("users")
      .where("name", "==", name)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          db.collection("users").doc(name).set({
            name: name,
            password: password,
            delay: "1",
            filterLevel: "2",
            sortOrder: "down"
          });
          setUser(name);
        } else {
          alert("Please select another name.")
        }        
      })
      .catch(err => { console.error(err) });;
  }

  return (
    <>
      <Button 
        onClick={() => setshowModal(true)}
        style={{border: "none", color: "white", backgroundColor: "rgb(9, 133, 114)"}}>
        Log In / Sign Up
      </Button>

      <Modal show={showModal} onHide={() => setshowModal(false)}>
        <Modal.Header closeButton style={{backgroundColor: "rgb(8, 99, 78)", color: "white"}}>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setname(e.target.value)}
              placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pass Word</Form.Label>
            <Form.Control
              type="password"
              onChange={e => setpassword(e.target.value)}
              placeholder="Enter password" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="dark" onClick={login}>
            Log In
          </Button>
          &nbsp; - Or - &nbsp; 
          <Button variant="outline-dark" onClick={signUp}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

LogIn.propTypes = {
  setUser: PropTypes.func.isRequired,
  setDelay: PropTypes.func.isRequired,
  setSympLevel: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired
}