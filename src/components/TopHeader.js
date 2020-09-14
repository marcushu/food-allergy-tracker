import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import BadFoods from './BadFoods';
import ListView from './ListView';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import db from '../firebaseConfig';
import LogIn from './LogIn';
import '../css/TopHeader.css'
import Splash from './Splash';


export default function TopHeader() {
  const [data, setData] = useState([]);
  const [sortOrder, setsortOrder] = useState("");
  const [delay, setdelay] = useState("1");
  const [filter, setfilter] = useState("2");
  const [currentUser, setcurrentUser] = useState("");
  const [showSettings, setshowSettings] = useState(false);

  let load;


  useEffect(() => { load(); },
    [delay, load, currentUser]);


  load = () => {
    let tmp = [];
    const oneDay = 86400000;
    const mSecs = t => t.data.date.toDate().valueOf();

    setData([]);

    db.collection("food-entry")
      .where("user", "==", currentUser)
      .orderBy("date", "desc")
      .get()
      .then(res => {
        res.forEach(doc => {
          tmp.push({ id: doc.id, data: doc.data() });
        })

        // handle untracked rows
        for (let i = 0; i < delay; i++) {
          if (tmp[i]) tmp[i].data.symptomColor = 0;
        }

        // position symptom color (for styling output)
        for (let currentI = delay; currentI < tmp.length; currentI++) {
          if (mSecs(tmp[currentI - delay]) - mSecs(tmp[currentI]) === (oneDay * delay))
            tmp[currentI].data.symptomColor = tmp[currentI - delay].data.symptomLevel;
        }
        setData(tmp);
      })
      .catch(err => { console.error(err) });
  }


  const updateFoods = (newValue, record) => {
    if (record.recordId == null) {
      db.collection("food-entry").doc().set({
        user: currentUser,
        amFoods: record.ampm === "amFoods" ? newValue : "",
        pmFoods: record.ampm === "pmFoods" ? newValue : "",
        symptomLevel: 1,
        date: new Date(new Date().toDateString())
      })
        .then(() => load())
        .catch(err => console.error(err));
    } else {
      db.collection("food-entry")
        .doc(record.recordId)
        .update({ [record.ampm]: newValue })
        .then(() => load())
        .catch(err => console.error(err));
    }
  }


  const insertDay = _date => {
    db.collection("food-entry")
      .where("name", "==", currentUser)
      .where("date", "==", _date)
      .get()
      .then(result => {
        if (result.empty) {
          db.collection("food-entry").doc().set({
            user: currentUser,
            amFoods: "",
            pmFoods: "",
            symptomLevel: 1,
            date: new Date(_date)
          })
            .then(() => load());
        }
      })
      .catch(err => console.error(err));
  }


  const updateSettings = (setting, newVal) => {
    db.collection("users").doc(currentUser).update({
      [setting]: newVal
    })
      .catch(err => console.error(err));
    // keeping this out of a .then(...) block speeds up UI sortOrder updates 
    switch (setting) {
      case "sortOrder":
        setsortOrder(newVal);
        break;
      case "filterLevel":
        setfilter(newVal);
        break;
      case "delay":
        setdelay(newVal);
        break;
      default:
        break;
    }
  }

  const deleteEntry = _id => {
    db.collection("food-entry")
      .doc(_id)
      .delete()
      .then(() => { load(); })
      .catch(err => console.error(err));
  }


  return (
    <>
      <br />
      <Row
        style={{ backgroundColor: "rgb(8, 99, 78)", borderRadius: "8px" }}
        className="p-2 m-1" >
        <Col md={4} className="d-flex justify-content-between">
          <span className="larger">Allergy Tracker</span>
        </Col>
        <Col md={4}>
          <span className="smaller">Catalog and track what you eat - <br />
            Pinpoint possible issues.
          </span>
        </Col>
        <Col md={4} className="text-right pt-2">
          <LogIn
            setUser={usr => setcurrentUser(usr)}
            setDelay={days => setdelay(days)}
            setSympLevel={level => setfilter(level)}
            setSortOrder={order => setsortOrder(order)} />
        </Col>
      </Row>
      {currentUser ?
        <>
          {showSettings ?
            <Row>
              <Col>
                <Settings
                  sort={sortOrder}
                  setSortOrder={direction => setsortOrder(direction)}
                  delay={delay}
                  setDelay={days => setdelay(days)}
                  filter={filter}
                  setFilter={level => setfilter(level)}
                  update={((setting, val) => updateSettings(setting, val))} />
              </Col>
            </Row>
            : <Row><Col></Col></Row>}
          <Row style={{ backgroundColor: "rgb(8, 99, 78)", borderRadius: "6px" }} className="m-1">
            <Col className="text-right pr-4">
              <button
                id="settingButton"
                onClick={() => setshowSettings(!showSettings)}>
                Show/Hide Settings
              </button>
            </Col>
          </Row>
          <Row className="pr-2">
            <Col className="text-right">
              none:<span id="none">W</span> &nbsp;
              mild:<span id="mild">W</span> &nbsp;
              moderate:<span id="moderate">W</span> &nbsp;
              severe:<span id="severe">W</span>
            </Col>
          </Row>
          <Row>
            <Col lg={2}>
              <BadFoods
                foods={data}
                filterLevel={filter}
                sortOrder={sortOrder} />
            </Col>
            <Col lg={10}>
              <ListView
                insertDay={insertDay}
                foodData={data}
                deleteEntry={id => deleteEntry(id)}
                setFoods={updateFoods} />
            </Col>
          </Row>
        </>
        : <Splash />
      }
    </>
  )
}