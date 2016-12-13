import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Button } from 'react-bootstrap';

export default class ReceiveIR extends React.Component {
  constructor(props) {
    super(props);
  }
  receiveIR() {
    this.props.startReceiving();
    Meteor.call('irReceive', 'deviceID', 'acccesstoken');
    setTimeout(function() { this.props.finishReceiving(); }.bind(this), 8000);
  }
  render() {
    if (this.props.buttonState === 'receive') {
      return (
        <Button onClick={() => this.receiveIR()} bsStyle="primary" block>{i18n.getTranslation('receiveIR', 'receive')}</Button>
      );
    } else if (this.props.buttonState === 'receiving') {
      return (
        <Button bsStyle="info" block>{i18n.getTranslation('receiveIR', 'loading')}</Button>
      );
    } else {
      return (
        <div>
          {i18n.getTranslation('receiveIR', 'successMessage')}
          <Button onClick={() => this.receiveIR()} bsStyle="danger" block>{i18n.getTranslation('receiveIR', 'retry')}</Button>
          <Button bsStyle="primary" block>{i18n.getTranslation('buttonRegister', 'register')}</Button>
        </div>
      );
    }
  }
}

ReceiveIR.propTypes = {
  buttonState: React.PropTypes.string,
  startReceiving: React.PropTypes.func,
  finishReceiving: React.PropTypes.func,
};
