import React from 'react';
import i18n from 'meteor/universe:i18n';
import Validation from 'react-validation';
import { Grid } from 'react-bootstrap';
import '../../api/validator/form_validator';
import Alert from 'react-s-alert';
import BackButton from '../components/BackButton';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ResetPassword extends TrackerReact(React.Component) {
  formReset() {
    document.getElementById('new-password').value = '';
    document.getElementById('new-password-again').value = '';
  }

  handleSubmit(event) {
    event.preventDefault();
    Accounts.resetPassword(this.props.params.token, event.target.password.value, (error) => {
      if (!error) {
        this.formReset();
        Alert.success(i18n.getTranslation('resetPassword', 'alerts.success'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      } else if (error.reason === 'Token expired' ) {
        Alert.error(i18n.getTranslation('resetPassword', 'alerts.tokenExpired'), {
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
        <Grid className='center reset-password-center'>
          <Validation.components.Form onSubmit={ this.handleSubmit.bind(this) }>
            <Validation.components.Input
              id='new-password'
              className='input-style'
              type='password'
              value=''
              name='password'
              placeholder={ i18n.getTranslation('resetPassword', 'newPassword') }
              validations={ ['required', 'password'] }
            />
            <Validation.components.Input
              id='new-password-again'
              className='input-style'
              type='password'
              value=''
              name='confirmPassword'
              placeholder={ i18n.getTranslation('resetPassword', 'newPasswordAgain') }
              validations={ ['required', 'confirmPassword'] }
            />
            <Validation.components.Button className='button-style reset-password-button'>{i18n.getTranslation('resetPassword', 'update')}</Validation.components.Button>
          </Validation.components.Form>
        </Grid>
        <BackButton link='sign-in'/>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
