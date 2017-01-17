import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../components/Header';
import Validation from 'react-validation';
import '../../api/validator/form_validator';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Grid, Col, Row } from 'react-bootstrap';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import Loading from 'react-loading';
import { browserHistory } from 'react-router';


export default class AddSmartRemote extends TrackerReact(React.Component) {
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
          <Loading type='bars' color='rgb(255, 255, 255)' />
        </Col>
      );
    } else if (Meteor.user()) {
      i18n.setLocale(Meteor.user().profile.language);
      return (
        <div>
          <Header/>
          <Grid className="center button-register-center">
            <Validation.components.Form onSubmit={this.handleSubmit.bind(this)} >
              <Row>
                <Col>
                  <Validation.components.Input
                    id='input-device-id'
                    className='input-style'
                    type='text'
                    name='deviceId'
                    value=''
                    placeholder={i18n.getTranslation('addPhoton', 'deviceId')}
                    validations={['required', 'deviceId']}/>
                  <Validation.components.Input
                    id='input-access-token'
                    className='input-style'
                    type='text'
                    name='accessToken'
                    value=''
                    placeholder={i18n.getTranslation('addPhoton', 'accessToken')}
                    validations={['required', 'accessToken']}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Validation.components.Button className='button-style add-photon-button'>{i18n.getTranslation('addPhoton', 'register')}</Validation.components.Button>
                </Col>
              </Row>
            </Validation.components.Form>
          </Grid>
          <Alert stack={{limit: 1}} />
        </div>
      );
    } else {
      browserHistory.push('/sign-in');
      return null;
    }
  }
}
