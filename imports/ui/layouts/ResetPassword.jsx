import React from 'react';
import i18n from 'meteor/universe:i18n';
import LanguageSelector from '../components/LanguageSelector.jsx';
import Validation from 'react-validation';
import '../../api/validator/form_validator';

export default class ResetPassword extends React.Component {
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


  handleSubmit(event) {
    event.preventDefault();
    Accounts.resetPassword(this.props.params.token, event.target.password.value, (error) => {
      if (error) {
        console.log("失敗");
      }
    });
  }

  render() {
    return (
      <div>
        <LanguageSelector/>
        <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
          <Validation.components.Input
            id='reset-input-password'
            type='password'
            value=''
            name='password'
            placeholder={i18n.getTranslation('forgotPassword', 'newPassword')}
            validations={['required', 'password']}/>
          <Validation.components.Button>{i18n.getTranslation('forgotPassword', 'reset')}</Validation.components.Button>
          </Validation.components.Form>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
