import React from 'react';
import Slider from '../components/Slider';
import { Col } from 'react-bootstrap';

export default class MyPageLarge extends React.Component {

  render() {
    let largeRed = {
      height: "45vh",
      padding: "2.5px",
    };

    let largeBlue = {
      height: "45vh",
      padding: "2.5px",
    };

    let largeYellow = {
      height: "45vh",
      padding: "2.5px",
    };

    let largeGreen = {
      height: "45vh",
      padding: "2.5px",
    };

    let largeStyle = {
      backgroundColor: "gray",
      height: "100%",
    };

    let largeMainpad = {
      padding: "2.5px",
    };

    let smallRed = {
      height: "24vh",
      padding: "2.5px",
    };

    let smallBlue = {
      height: "24vh",
      padding: "2.5px",
    };

    let smallYellow = {
      height: "24vh",
      padding: "2.5px",
    };

    let smallStyle = {
      backgroundColor: "gray",
      height: "100%",
    };
    let smallMainStyle = {
      padding: "2.5px",
    };


    let aaa = "a";
    if (aaa === "b") {
      return (
        <div>
          <Slider/>
          <div style={largeMainpad}>
            <Col xs={6} md={6} style={largeRed}>
              <div style={largeStyle}>1</div>
            </Col>
            <Col xs={6} md={6} style={largeBlue}>
              <div style={largeStyle}>2</div>
            </Col>
            <Col xs={6} md={6} style={largeYellow}>
              <div style={largeStyle}>3</div>
            </Col>
            <Col xs={6} md={6} style={largeGreen}>
              <div style={largeStyle}>4</div>
            </Col>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Slider/>
          <div style={smallMainStyle}>
            <Col xs={3} md={3} style={smallRed}>
              <div style={smallStyle}>1</div>
            </Col>
            <Col xs={3} md={3} style={smallBlue}>
              <div style={smallStyle}>2</div>
            </Col>
            <Col xs={3} md={3} style={smallYellow}>
              <div style={smallStyle}>3</div>
            </Col>
            <Col xs={3} md={3} style={smallRed}>
              <div style={smallStyle}>4</div>
            </Col>
            <Col xs={3} md={3} style={smallBlue}>
              <div style={smallStyle}>5</div>
            </Col>
            <Col xs={3} md={3} style={smallYellow}>
              <div style={smallStyle}>6</div>
            </Col>
            <Col xs={3} md={3} style={smallRed}>
              <div style={smallStyle}>7</div>
            </Col>
            <Col xs={3} md={3} style={smallBlue}>
              <div style={smallStyle}>8</div>
            </Col>
            <Col xs={3} md={3} style={smallYellow}>
              <div style={smallStyle}>9</div>
            </Col>
            <Col xs={3} md={3} style={smallRed}>
              <div style={smallStyle}>10</div>
            </Col>
            <Col xs={3} md={3} style={smallBlue}>
              <div style={smallStyle}>11</div>
            </Col>
            <Col xs={3} md={3} style={smallYellow}>
              <div style={smallStyle}>12</div>
            </Col>
            <Col xs={3} md={3} style={smallRed}>
              <div style={smallStyle}>13</div>
            </Col>
            <Col xs={3} md={3} style={smallBlue}>
              <div style={smallStyle}>14</div>
            </Col>
            <Col xs={3} md={3} style={smallYellow}>
              <div style={smallStyle}>15</div>
            </Col>
            <Col xs={3} md={3} style={smallRed}>
              <div style={smallStyle}>16</div>
            </Col>
          </div>
        </div>
      );
    }
  }
}