import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../components/Header';
import ReceiveIR from '../components/ReceiveIR';
import { Col } from 'react-bootstrap';
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
    let registerButton = '';
    if (this.state.receiveState === "received") {
      registerButton = <Validation.components.Button className='btn btn-success'>{i18n.getTranslation('buttonRegister', 'register')}</Validation.components.Button>;
    }
    return (
      <div>
        <Header/>
        <Col mdOffset={4} md={4}>
          <h2 className="text-center">{i18n.getTranslation('buttonRegister', 'title')}</h2>
        </Col>
        <Validation.components.Form onSubmit={this.handleSubmit.bind(this)} >
          <Col mdOffset={4} md={4}>
          <Validation.components.Input
            id='input-button-title'
            className='form-control'
            type='text'
            name='buttonTitle'
            value=''
            placeholder={i18n.getTranslation('buttonRegister', 'buttonTitle')}
            validations={['required', 'buttonTitle']}/>
          </Col>
          <Col mdOffset={4} md={4}>
            <ReceiveIR
              buttonState={this.state.receiveState}
              startReceiving={() => this.startReceiving()}
              finishReceiving={() => this.finishReceiving()}
            />
            { registerButton }
          </Col>
        </Validation.components.Form>
      </div>
    );
  }
}
