import React from 'react';
import Slider from '../components/Slider';
import { Col } from 'react-bootstrap';

export default class MyPageSmall extends React.Component {

  render() {
    return (
        <div>
          <Slider/>
          <Col xs={3} md={3}>
            1
          </Col>
          <Col xs={3} md={3}>
            2
          </Col>
          <Col xs={3} md={3}>
            3
          </Col>
          <Col xs={3} md={3}>
            4
          </Col>
          <Col xs={3} md={3}>
            5
          </Col>
          <Col xs={3} md={3}>
            6
          </Col>
          <Col xs={3} md={3}>
            7
          </Col>
          <Col xs={3} md={3}>
            8
          </Col>
          <Col xs={3} md={3}>
            9
          </Col>
          <Col xs={3} md={3}>
            10
          </Col>
          <Col xs={3} md={3}>
            11
          </Col>
          <Col xs={3} md={3}>
            12
          </Col>
          <Col xs={3} md={3}>
            13
          </Col>
          <Col xs={3} md={3}>
            14
          </Col>
          <Col xs={3} md={3}>
            15
          </Col>
          <Col xs={3} md={3}>
            16
          </Col>
        </div>
    );
  }
}
