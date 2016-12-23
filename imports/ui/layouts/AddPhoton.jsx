import React from 'react';
import i18n from 'meteor/universe:i18n';
import Validation from 'react-validation';
import '../../api/validator/form_validator';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Col } from 'react-bootstrap';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import Loading from 'react-loading';


export default class AddPhoton extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      deviceId: event.target.deviceId.value,
      accessToken: event.target.accessToken.value,
    };
    Meteor.call('addPhotonInfo', params, (error)=>{
      if (!error) {
        document.getElementById('input-device-id').value = '';
        document.getElementById('input-access-token').value = '';
        Alert.success(i18n.getTranslation('addPhoton', 'success'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      }
    });
  }

  render() {
    if (Meteor.loggingIn()) {
      return (
        <Col xsOffset={4} xs={4} mdOffset={4} md={4}>
          <Loading type='bars' color='rgb(65, 136, 230)' />
        </Col>
      );
    } else {
      i18n.setLocale(Meteor.user().profile.language);
      return (
        <div>
          <Validation.components.Form onSubmit={this.handleSubmit.bind(this)} >
            <div>{i18n.getTranslation('addPhoton', 'photonInfo')}</div>
            <Col xsOffset={1} xs={10}>
              <Validation.components.Input
                id='input-device-id'
                className='form-control'
                type='text'
                name='deviceId'
                value=''
                placeholder={i18n.getTranslation('addPhoton', 'deviceId')}
                validations={['required', 'deviceId']}/>
              <Validation.components.Input
                id='input-access-token'
                className='form-control'
                type='text'
                name='accessToken'
                value=''
                placeholder={i18n.getTranslation('addPhoton', 'accessToken')}
                validations={['required', 'accessToken']}/>
            </Col>
            <Col xsOffset={5} xs={2}>
              <Validation.components.Button className='btn btn-success'>{i18n.getTranslation('addPhoton', 'register')}</Validation.components.Button>
            </Col>
          </Validation.components.Form>
          <Alert stack={{limit: 1}} />
        </div>
      );
    }
  }
}
