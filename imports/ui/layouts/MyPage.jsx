import React from 'react';
import Slider from '../components/Slider';
import { Button, Col, Row } from 'react-bootstrap';
import PanelSlot from '../components/PanelSlot';

export default class MyPage extends React.Component {

  button1() {
    console.log("１が押されました");
  }

  button2() {
    console.log("2が押されました");
  }

  button3() {
    console.log("3が押されました");
  }

  button4() {
    console.log("4が押されました");
  }

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
      height: "100%",
    };

    let largeMainStyle = {
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
      height: "100%",
    };
    let smallMainStyle = {
      padding: "2.5px",
    };

    // let mainStyle = {
    //   padding: "2.5px",
    // };

    let buttonStyle = {
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      borderColor: "#ffffff",
      appearance: "none",
    };

    if (this.props.params.size === "graf-widget" || this.props.params.size === "widget" ) {
      return (
        <div>
          { console.log(this.props.params.data) }
          <Slider/>
          <div style={largeMainStyle}>
            <Col xs={6} md={6} style={largeRed}>
              <div style={largeStyle}><Button bsSize="large" active style={buttonStyle} onClick={<PanelSlot />}>1</Button></div>
            </Col>
            <Col xs={6} md={6} style={largeBlue}>
              <div style={largeStyle}><Button bsSize="large" active style={buttonStyle} onClick={() => this.button2()}>2</Button></div>
            </Col>
            <Col xs={6} md={6} style={largeYellow}>
              <div style={largeStyle}><Button bsSize="large" active style={buttonStyle} onClick={() => this.button3()}>3</Button></div>
            </Col>
            <Col xs={6} md={6} style={largeGreen}>
              <div style={largeStyle}><Button bsSize="large" active style={buttonStyle} onClick={() => this.button4()}>4</Button></div>
            </Col>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          { console.log(this.props.params.data) }
          <Slider/>
          <div style={smallMainStyle}> {/* 1L-1 */}
            <div>
              <Col xs={6} md={6} style={largeGreen}>
                <div style={largeStyle}><Button bsSize="large" active style={buttonStyle} onClick={() => this.button4()}>1</Button></div>
              </Col>
            </div>
            <div>
              <Col xs={6} md={6} style={largeGreen}>
                <div style={largeStyle}><Button bsSize="large" active style={buttonStyle} onClick={() => this.button4()}>2</Button></div>
              </Col>
            </div>
            <div>
              <Col xs={6} md={6} style={largeGreen}>
                <div style={largeStyle}><Button bsSize="large" active style={buttonStyle} onClick={() => this.button4()}>3</Button></div>
              </Col>
            </div>
            <div>
              <Col xs={3} md={3} style={smallRed}>
                <div style={smallStyle}><Button bsSize="small" active style={buttonStyle} onClick={() => this.button5()}>13</Button></div>
              </Col>
              <Col xs={3} md={3} style={smallBlue}>
                <div style={smallStyle}><Button bsSize="small" active style={buttonStyle} onClick={() => this.button5()}>14</Button></div>
              </Col>
              <Col xs={3} md={3} style={smallRed}>
                <div style={smallStyle}><Button bsSize="small" active style={buttonStyle} onClick={() => this.button5()}>16</Button></div>
              </Col>
            </div>
          </div>
        </div>
      );
    }
  }
}

MyPage.propTypes = {
  params: React.PropTypes.object,
};
