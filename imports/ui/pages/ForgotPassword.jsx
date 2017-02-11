import React from 'react';
import { Meteor } from 'meteor/meteor';
import Validation from 'react-validation';
import { Grid } from 'react-bootstrap';
import '../../api/validator/form_validator';
import Alert from 'react-s-alert';
import BackButton from '../components/BackButton';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ForgotPassword extends TrackerReact(React.Component) {
  formReset() {
    document.getElementById('input-reset-email').value = '';
  }

  handleSubmit(event) {
    event.preventDefault();
    let emailVar = event.target.email.value;
    Meteor.call('sendForgotPasswordEmail', i18n.getLocale(), emailVar, (error) => {
      if (!error) {
        this.formReset();
        Alert.success(i18n.getTranslation('forgotPassword', 'alerts.success'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      } else if (error.error === "Email already sent") {
        Alert.error(i18n.getTranslation('forgotPassword', 'alerts.alreadySent'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      } else if (error.error === 'Email address not found') {
        Alert.error(i18n.getTranslation('forgotPassword', 'alerts.invalidEmail'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Grid className="center forgot-password-center">
          <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
            <Validation.components.Input
              id="input-reset-email"
              type="email"
              value=''
              name="email"
              placeholder={i18n.getTranslation('forgotPassword', 'email')}
              validations={['required', 'email']}
              className="input-style"
            />
            <Validation.components.Button className="button-style forgot-password-button">{i18n.getTranslation('forgotPassword', 'reset')}</Validation.components.Button>
          </Validation.components.Form>
        </Grid>
        <BackButton link="sign-in"/>
      </div>
    );
  }
}
