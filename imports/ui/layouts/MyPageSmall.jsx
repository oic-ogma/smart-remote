import React from 'react';
import Slider from '../components/Slider';
import { Col } from 'react-bootstrap';

export default class MyPageSmall extends React.Component {

  render() {
    let red = {
      height: "24vh",
      padding: "2.5px",
    };

    let blue = {
      height: "24vh",
      padding: "2.5px",
    };

    let yellow = {
      height: "24vh",
      padding: "2.5px",
    };

    let style = {
      backgroundColor: "gray",
      height: "100%",
    };
    let mainStyle = {
      padding: "2.5px",
    };

    return (
      <div>
        <Slider/>
        <div style={mainStyle}>
          <Col xs={3} md={3} style={red}>
            <div style={style}>1</div>
          </Col>
          <Col xs={3} md={3} style={blue}>
            <div style={style}>2</div>
          </Col>
          <Col xs={3} md={3} style={yellow}>
            <div style={style}>3</div>
          </Col>
          <Col xs={3} md={3} style={red}>
            <div style={style}>4</div>
          </Col>
          <Col xs={3} md={3} style={blue}>
            <div style={style}>5</div>
          </Col>
          <Col xs={3} md={3} style={yellow}>
            <div style={style}>6</div>
          </Col>
          <Col xs={3} md={3} style={red}>
            <div style={style}>7</div>
          </Col>
          <Col xs={3} md={3} style={blue}>
            <div style={style}>8</div>
          </Col>
          <Col xs={3} md={3} style={yellow}>
            <div style={style}>9</div>
          </Col>
          <Col xs={3} md={3} style={red}>
            <div style={style}>10</div>
          </Col>
          <Col xs={3} md={3} style={blue}>
            <div style={style}>11</div>
          </Col>
          <Col xs={3} md={3} style={yellow}>
            <div style={style}>12</div>
          </Col>
          <Col xs={3} md={3} style={red}>
            <div style={style}>13</div>
          </Col>
          <Col xs={3} md={3} style={blue}>
            <div style={style}>14</div>
          </Col>
          <Col xs={3} md={3} style={yellow}>
            <div style={style}>15</div>
          </Col>
          <Col xs={3} md={3} style={red}>
            <div style={style}>16</div>
          </Col>
        </div>
      </div>
    );
  }
}
