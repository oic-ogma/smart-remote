import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Button } from 'react-bootstrap';

export default class IrTest extends React.Component {
  irTestSend() {
    Meteor.call("irTestSend", 'deviceId', 'accessToken');
  }

  render() {
    return (
      <Button bsStyle="success" bsSize="small" onClick={this.irTestSend} >
        {i18n.getTranslation('irTest', 'testButton')}
      </Button>
    );
  }
}
