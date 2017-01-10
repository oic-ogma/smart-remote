import React from 'react';
import i18n from 'meteor/universe:i18n';

export default class IrTest extends React.Component {
  irTestSend() {
    Meteor.call("irTestSend", 'deviceId', 'accessToken');
  }

  render() {
    return (
          <button type="button" className="button-style button-register-margin"  onClick={this.irTestSend}>
            {i18n.getTranslation('irTest', 'testButton')}
          </button>
    );
  }
}
