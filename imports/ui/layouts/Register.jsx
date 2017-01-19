import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import Header from '../components/Header';
import Validation from 'react-validation';
import '../../api/validator/form_validator';
import { Grid } from 'react-bootstrap';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import BackButton from '../components/BackButton';

export default class Register extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      locale: i18n.getLocale(),
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

  formReset() {
    document.getElementById('input-email').value = '';
    document.getElementById('input-confirm-email').value = '';
  }

  handleSubmit(event) {
    event.preventDefault();
    let emailVar = event.target.registerEmail.value;
    let confirmEmailVar = event.target.confirmEmail.value;
    if (emailVar === confirmEmailVar) {
      Meteor.call('sendEnrollmentEmail', i18n.getLocale(), emailVar, (error) => {
        if (error) {
          Alert.error(i18n.getTranslation('alert', 'error.register'), {
            position: 'bottom',
            effect: 'genie',
            timeout: 3000,
          });
        } else {
          Alert.success(i18n.getTranslation('alert', 'success.register'), {
            position: 'bottom',
            effect: 'genie',
            timeout: 3000,
          });
          this.formReset();
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <Grid className="center register-center">
          <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
            <Validation.components.Input
              id="input-email"
              type="email"
              value=''
              name="registerEmail"
              placeholder={i18n.getTranslation('form', 'email')}
              validations={['required', 'email']}
              className="input-style"/>
            <Validation.components.Input
              id="input-confirm-email"
              type="email"
              value=''
              name="confirmEmail"
              placeholder={i18n.getTranslation('form', 'confirmEmail')}
              validations={['confirmEmail']}
              className="input-style"/>
            <Validation.components.Button
              className="button-style register-button">
              {i18n.getTranslation('form', 'registerBtn')}
            </Validation.components.Button>
          </Validation.components.Form>
          <BackButton link="sign-in"/>
          <Alert stack={{limit: 1}} />
        </Grid>
      </div>
    );
  }
}
