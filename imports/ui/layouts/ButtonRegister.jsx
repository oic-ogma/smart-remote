import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../components/Header';
import ReceiveIR from '../components/ReceiveIR';
import { Grid, Col, Row } from 'react-bootstrap';
import Validation from 'react-validation';

export default class ButtonRegister extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      locale: i18n.getLocale(),
      receiveState: 'receive',
    };
    this.onLocale = this.onLocale.bind(this);
  }

  onLocale(locale) {
    this.setState({locale});
  }

  componentWillMount() {
    i18n.onChangeLocale(this.onLocale);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  startReceiving() {
    this.setState({receiveState: "receiving"});
  }

  finishReceiving() {
    this.setState({receiveState: "received"});
  }

  handleSubmit(event) {
    event.preventDefault();
    const test = event.target.buttonTitle.value;
    Meteor.call('getIrData', test);
  }

  render() {
    return (
      <div>
        <Header/>
        <Grid className="center button-register-center">
          <Validation.components.Form onSubmit={this.handleSubmit.bind(this)} >
            <Row>
              <Col>
                <Validation.components.Input
                  id='input-button-title'
                  className='input-style'
                  type='text'
                  name='buttonTitle'
                  value=''
                  placeholder={i18n.getTranslation('buttonRegister', 'buttonTitle')}
                  validations={['required', 'buttonTitle']}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <ReceiveIR
                  buttonState={this.state.receiveState}
                  startReceiving={() => this.startReceiving()}
                  finishReceiving={() => this.finishReceiving()}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {
                  (this.state.receiveState === "received")
                    ? <Validation.components.Button className="button-style">{i18n.getTranslation('buttonRegister', 'register')}</Validation.components.Button>
                    : null
                }
              </Col>
            </Row>
          </Validation.components.Form>
        </Grid>
      </div>
    );
  }
}
