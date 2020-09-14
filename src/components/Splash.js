import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../css/Splash.css"

export default function Splash() {
  return (
    <Row>
      <Col lg={1}></Col>
      <Col lg={10} className="d-flex justify-content-center p-3">
        <div className="myCard">
          <Row className="p-3">
            <Col sm={3}><span className="bigger">Gut Tracker</span><br/> <br /></Col>
            <Col className="bodyText">
              <p>Gut Tracker is a kind of food diary meant to aid in identifying
            foods that  might be causing a delayed negative reaction. </p> <p>Wheather it' a mild
              allergic reaction, an autoimmune response, or just something you have trouble digesting,
            keeping a food diary is one way to identify problematic (or beneficial) foods. </p><p>Log what you ate and your
              current symptom level on a particular day. Adjust the offset setting (a food allergen can
            take up to three days to have an effect), and look for a pattern. </p>
            </Col>
          </Row>
          <Row className="p-3">
            <Col sm={3}><span className="bigger">Log In</span><br/> <br /></Col>
            <Col className="bodyText">
              <div style={{border: "1px solid", borderRadius: "4px", padding: "5px"}}>
              Log In with the name <span className="emph">mickey</span>  and password <span className="emph"> mouse </span>to play with some example data
              </div>
            </Col>
          </Row>
          <Row className="p-3">
            <Col sm={3}><span className="bigger">Settings</span><br/> <br /></Col>
            <Col className="bodyText">
              <p>Adjust display options and reaction time.</p>
              <ul>
                <li>
                  Select a sort-order for foods on your watch list: save foods, or possible problem foods at top.
              </li>
                <li>
                  Selecte the number of days to offset the onset of symptoms. (0 - 3).
              </li>
                <li>
                  Set a filter for foods on your watch list to restrict what is displayed.
              </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Col>
      <Col lg={1}></Col>
    </Row>
  )
}