import React from 'react';
import TopHeader from './components/TopHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function App() {
  return (
    <div className="container-fluid" style={{backgroundColor: "rgb(211, 237, 226)"}}>
      <Row>
        <Col>
          <TopHeader />
        </Col>
      </Row>      
    </div>
  );
}

export default App;
