import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../components/Header';
import Validation from 'react-validation';
import '../../api/validator/form_validator';
import CountrySelector from '../components/CountrySelector';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

export default class EnrollAccount extends React.Component {
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
    i18n.setLocale(this.props.params.language);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale);
  }

  formReset() {
    document.getElementById('input-password').value = '';
    document.getElementById('input-confirm-password').value = '';
    document.getElementById('country-dropdown').value = '';
    document.getElementById('region-dropdown').value = '';
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
        Meteor.call('addEnrollmentInfo', params);
        Alert.success(i18n.getTranslation('alert', 'success.enroll'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
        this.formReset();
      }
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="center enroll-center">
          <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
            <div className="position">
              <Validation.components.Input
                id='input-password'
                className='input-style'
                type='password'
                value=''
                name='password'
                placeholder={i18n.getTranslation('form', 'password')}
                validations={['required', 'password']}/>
            </div>
            <div className="position">
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
            <Validation.components.Button className="button-style enroll-button">{i18n.getTranslation('form', 'enrollBtn')}</Validation.components.Button>
          </Validation.components.Form>
          <Alert stack={{limit: 1}} />
        </div>
      </div>
    );
  }
}

EnrollAccount.propTypes = {
  params: React.PropTypes.object,
};
