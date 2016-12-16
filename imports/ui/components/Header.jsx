import React from 'react';
import LanguageSelector from './LanguageSelector';
import { Grid, Col, Row } from 'react-bootstrap';

export default class Header extends React.Component {

  render() {
    let style = {
      header: {
        display: "flex",
        alignItems: "center",
        margin: "20px 0"
      },
      h1: {
        margin: 0,
        fontSize: "18px",
        color: "#fff",
        textAlign: "center"
      }
    };

    return (
      <Grid>
        <Row style={style.header}>
          <Col xs={2} md={3} >
            {/* TODO  */}
          </Col>
          <Col xs={9} md={6}>
            <h1 style={style.h1}>Smart Controller</h1>
          </Col>
          <Col xs={2} md={3}>
            <LanguageSelector/>
          </Col>
        </Row>
      </Grid>
    );
  }
}
