import React from 'react';
import Slider from '../components/Slider';
import { Col } from 'react-bootstrap';

export default class MyPageLarge extends React.Component {

  render() {
    let red = {
      height: "45vh",
      padding: "2.5px",
    };

    let blue = {
      height: "45vh",
      padding: "2.5px",
    };

    let yellow = {
      height: "45vh",
      padding: "2.5px",
    };

    let hoge = {
      height: "45vh",
      padding: "2.5px",
    };

    let style = {
      backgroundColor: "gray",
      height: "100%",
    };

    let mainpad = {
      padding: "2.5px",
    };
    return (
      <div>
        <Slider/>
        <div style={mainpad}>
          <Col xs={6} md={6} style={red}>
            <div style={style}>1</div>
          </Col>
          <Col xs={6} md={6} style={blue}>
            <div style={style}>2</div>
          </Col>
          <Col xs={6} md={6} style={yellow}>
            <div style={style}>3</div>
          </Col>
          <Col xs={6} md={6} style={hoge}>
            <div style={style}>4</div>
          </Col>
        </div>
      </div>
    );
  }
}
