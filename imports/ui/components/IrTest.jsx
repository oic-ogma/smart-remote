import React from 'react';
import i18n from 'meteor/universe:i18n';

export default class IrTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
    };
    this.irTestSend = this.irTestSend.bind(this);
  }

  irTestSend() {
    this.setState({sending: true});
    Meteor.call("irTestSend", 'deviceId', 'accessToken');
    setTimeout(function() { this.setState({sending: false}); }.bind(this), 3000);
  }

  render() {
    let disabled = this.state.sending ? 'disabled' : '';
    return (
        <button type='button' className='button-style button-register-margin' onClick={this.irTestSend} disabled={disabled}>
          {i18n.getTranslation('irTest', 'testButton')}
        </button>
    );
  }
}
