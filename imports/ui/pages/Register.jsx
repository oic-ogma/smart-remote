import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import Validation from 'react-validation';
import '../../api/validator/form_validator';
import { Grid } from 'react-bootstrap';
import Alert from 'react-s-alert';
import BackButton from '../components/BackButton';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Register extends TrackerReact(React.Component) {
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
        <Grid className='center register-center'>
          <Validation.components.Form onSubmit={ this.handleSubmit.bind(this) }>
            <Validation.components.Input
              id='input-email'
              type='email'
              value=''
              name='registerEmail'
              placeholder={ i18n.getTranslation('form', 'email') }
              validations={ ['required', 'email'] }
              className='input-style'/>
            <Validation.components.Input
              id='input-confirm-email'
              type='email'
              value=''
              name='confirmEmail'
              placeholder={ i18n.getTranslation('form', 'confirmEmail') }
              validations={ ['confirmEmail'] }
              className='input-style'/>
            <Validation.components.Button
              className='button-style register-button'>
              {i18n.getTranslation('form', 'registerBtn')}
            </Validation.components.Button>
          </Validation.components.Form>
          <BackButton link='sign-in'/>
        </Grid>
      </div>
    );
  }
}
