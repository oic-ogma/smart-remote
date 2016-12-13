import React from 'react';
import i18n from 'meteor/universe:i18n';
import LanguageSelector from '../components/LanguageSelector';
import ReceiveIR from '../components/ReceiveIR';
import { FormControl, Col } from 'react-bootstrap';

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
  render() {
    return (
      <div>
        <LanguageSelector/>
        <Col mdOffset={4} md={4}>
          <h2 className="text-center">{i18n.getTranslation('buttonRegister', 'title')}</h2>
        </Col>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Col mdOffset={4} md={4}>
            <FormControl type="text" placeholder={i18n.getTranslation('buttonRegister', 'buttonTitle')} />
          </Col>
          <Col mdOffset={4} md={4}>
            <ReceiveIR
              buttonState={this.state.receiveState}
              startReceiving={() => this.startReceiving()}
              finishReceiving={() => this.finishReceiving()}
            />
          </Col>
        </form>
      </div>
    );
  }
}
