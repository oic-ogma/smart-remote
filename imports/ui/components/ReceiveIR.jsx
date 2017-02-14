import React from 'react';
import i18n from 'meteor/universe:i18n';
import Loading from 'react-loading';

export default class ReceiveIR extends React.Component {
  constructor(props) {
    super(props);
  }

  receiveIR() {
    this.props.startReceiving();
    Meteor.call('irReceive');
    setTimeout(function() { this.props.finishReceiving(); }.bind(this), 8000);
  }

  render() {
    if (this.props.buttonState === 'receive') {
      return (
        <button type='button' onClick={ () => this.receiveIR() } className='button-style receive-button'>{ i18n.getTranslation('receiveIR', 'receive') }</button>
      );
    } else if (this.props.buttonState === 'receiving') {
      return (
        <button type='button' className='button-style receive-button receive-button-padding'><Loading type='bars' color='rgb(255, 255, 255)'/></button>
      );
    } else {
      return (
        <button type='button' onClick={ () => this.receiveIR() } className='button-style receive-button'>{ i18n.getTranslation('receiveIR', 'retry') }</button>
      );
    }
  }
}

ReceiveIR.propTypes = {
  buttonState: React.PropTypes.string,
  startReceiving: React.PropTypes.func,
  finishReceiving: React.PropTypes.func,
};
