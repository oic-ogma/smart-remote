import React from 'react';
import i18n from 'meteor/universe:i18n';
import Validation from 'react-validation';
import '../../api/validator/form_validator';
import CountrySelector from '../components/CountrySelector';
import Alert from 'react-s-alert';
import BackButton from '../components/BackButton';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { browserHistory } from 'react-router';

export default class EnrollAccount extends TrackerReact(React.Component) {

  formReset() {
    document.getElementById('input-password').value = '';
    document.getElementById('input-confirm-password').value = '';
    document.getElementById('country-dropdown').value = '';
    document.getElementById('city-dropdown').value = '';
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      country: event.target.country.value,
      city: event.target.city.value,
      language: i18n.getLocale(),
    };
    Accounts.resetPassword(this.props.params.token, event.target.password.value, (error) => {
      if (error) {
        Alert.error(i18n.getTranslation('alert', 'error.enroll'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      } else {
        Meteor.call('addEnrollmentInfo', params, (err)=>{
          if (!err) {
            Alert.success(i18n.getTranslation('alert', 'success.enroll'), {
              position: 'bottom',
              effect: 'genie',
              timeout: 3000,
            });
            browserHistory.push('/my-page');
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className='center enroll-center'>
          <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
            <div className='position'>
              <Validation.components.Input
                id='input-password'
                className='input-style'
                type='password'
                value=''
                name='password'
                placeholder={i18n.getTranslation('form', 'password')}
                validations={['required', 'password']}/>
            </div>
            <div className='position'>
              <Validation.components.Input
                id='input-confirm-password'
                className='input-style'
                type='password'
                value=''
                name='confirmPassword'
                placeholder={i18n.getTranslation('form', 'confirmPassword')}
                validations={['required', 'confirmPassword']}/>
            </div>
            <CountrySelector/>
            <div className='position'>
              <Validation.components.Input
                id='input-city'
                className='input-style'
                type='text'
                value=''
                name='city'
                placeholder={i18n.getTranslation('form', 'city')}
                validations={['required', 'city']}/>
            </div>
            <Validation.components.Button className='button-style enroll-button'>{i18n.getTranslation('form', 'enrollBtn')}</Validation.components.Button>
          </Validation.components.Form>
          <BackButton link='register'/>
        </div>
      </div>
    );
  }
}

EnrollAccount.propTypes = {
  params: React.PropTypes.object,
};
