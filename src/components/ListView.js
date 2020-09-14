import React from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import AddFoodBtn from './AddFoodBtn';
import "react-datepicker/dist/react-datepicker.css";
import '../css/ListView.css';
import PropTypes from 'prop-types';

export default function ListView({ foodData, setFoods, insertDay, deleteEntry }) {
  const sLevel = ["unTracked", "none", "mild", "moderate", "severe"];

  return (
    <>
      <Table>
        <thead>
          <tr id="tableHead">
            <th style={{ borderRadius: "10px 0px 0px 0px" }}>
              <div className="d-flex justify-content-between">
                <span>Meals - A.M. / P.M.</span>
                <span>
                  <DatePicker
                    id="picker"
                    onChange={insertDay}
                    placeholderText="...Insert Day" />
                </span>
              </div>
            </th>
            <th style={{ borderRadius: "0px 10px 0px 0px" }}>
              Symptoms
            </th>
          </tr>
        </thead>
        <tbody>
          {!!foodData ? foodData.map(fd =>
            <tr key={fd.id}>
              <td className={sLevel[fd.data.symptomColor]}>
                <Row>
                  <Col className="d-flex justify-content-between">
                    <span className="dateSM">{fd.data.date.toDate().toDateString()}</span>
                    <span>
                      <button 
                        onClick={() => deleteEntry(fd.id)} 
                        className="deleteBtn">
                          X
                      </button>
                    </span>
                  </Col>
                </Row>
                <Row className="p-1">
                  <Col sm={6} className={sLevel[fd.data.symptomColor]}>
                    <AddFoodBtn
                      _text={fd.data.amFoods}
                      record={{ recordId: fd.id, ampm: "amFoods" }}
                      update={setFoods} />
                    <span> &nbsp; {fd.data.amFoods}</span>
                  </Col>
                  <Col sm={6} className={sLevel[fd.data.symptomColor]}>
                    <AddFoodBtn
                      _text={fd.data.pmFoods}
                      record={{ recordId: fd.id, ampm: "pmFoods" }}
                      update={setFoods} />
                       &nbsp; {fd.data.pmFoods}
                  </Col>
                </Row>
              </td>
              <td style={{ backgroundColor: "rgb(8, 99, 78)", textAlign: "center" }}><br />
                <select
                  className="selectStyle"
                  value={fd.data.symptomLevel}
                  onChange={e => {
                    setFoods(e.target.value, { recordId: fd.id, ampm: "symptomLevel" });
                  }}>
                  <option value="1">None</option>
                  <option value="2">Mild</option>
                  <option value="3">Moderate</option>
                  <option value="4">Severe</option>
                </select>
              </td>
            </tr>
          )
            : <h4>loading...</h4>}
          <tr>
            <td style={{ backgroundColor: "rgb(8, 99, 78)", borderRadius: "0px 0px 0px 10px" }}></td>
            <td style={{ backgroundColor: "rgb(8, 99, 78)", borderRadius: "0px 0px 10px 0px" }}></td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

ListView.propTypes = {
  foodData: PropTypes.array.isRequired,
  setFoods: PropTypes.func.isRequired,
  insertDay: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired
}