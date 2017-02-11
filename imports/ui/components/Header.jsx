import React from 'react';
import LanguageSelector from './LanguageSelector';
import { Grid, Col, Row } from 'react-bootstrap';

export default class Header extends React.Component {

  render() {
    let style = {
      header: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0',
        middle: {
          marginLeft: '10px',
        },
        right: {
          marginRight: '10px',
        },
      },
      h1: {
        margin: 0,
        fontSize: '18px',
        color: '#fff',
        textAlign: 'center',
      },
    };

    return (
      <Grid>
        <Row style={ style.header }>
          <Col xs={ 2 } md={ 3 } >
            {/* TODO  メニュー*/}
          </Col>
          <Col xs={ 9 } md={ 6 } style={ style.header.middle }>
            <h1 style={ style.h1 }>Smart Remote</h1>
          </Col>
          <Col xs={ 2 } md={ 3 } style={ style.header.right }>
            <LanguageSelector style={ style.font }/>
          </Col>
        </Row>
      </Grid>
    );
  }
}
