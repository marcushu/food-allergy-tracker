import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/Settings.css';
import PropTypes from 'prop-types';

export default function Settings({
  sort,
  delay,
  filter,
  update }) {

  const delayText = ["0 days", "1 day", "2 days", "3 days", "4 days"];
  const filterText = ["all foods",
    "mild symptoms or worse",
    "moderate symptoms or worse",
    "only severe symptoms"];

  return (
    <>
      <Row className="p-4">
        <Col lg={3} className="pb-2">
          <span className="settingText">Sort food watch list:</span> <br /><br />
          <Form>
            <Form.Check
              custom
              inline
              label="Up"
              type="radio"
              id="custom-inline-radio-1"
              name="rd"
              value="up"
              checked={sort === "up"}
              onChange={() => update("sortOrder", "up")}
            />
            <Form.Check
              custom
              inline
              label="Down"
              type="radio"
              id="custom-inline-radio-2"
              name="rd"
              value="down"
              checked={sort === "down"}
              onChange={() => update("sortOrder", "down")}
            />
          </Form>
        </Col>
        <Col lg={4} className="pb-2">
          <Form.Group controlId="formBasicRange">
            <Form.Label>
              <span className="smallText">Delay symptom onset by: </span> <br />
              <span className="settingText">{delayText[delay]}</span>
            </Form.Label>
            <Form.Control
              type="range"
              min="0"
              max="3"
              value={delay}
              onChange={e => update("delay", e.target.value)}
              step="1" />
          </Form.Group>
        </Col>
        <Col lg={5} className="pb-2">
          <Form.Group controlId="formBasicRange">
            <Form.Label>
              <span className="smallText">Filter foods to display: </span> <br />
              <span className="settingText">{filterText[filter]}</span>
            </Form.Label>
            <Form.Control
              type="range"
              value={filter}
              onChange={e => update("filterLevel", e.target.value)}
              min="0"
              max="3"
              step="1" />
          </Form.Group>
        </Col>
      </Row>

    </>
  )
}

Settings.propTypes = {
  sort: PropTypes.string.isRequired,
  delay: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
}