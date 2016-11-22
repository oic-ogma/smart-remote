import React from 'react';
import i18n from 'meteor/universe:i18n';
import LanguageSelector from '../components/LanguageSelector.jsx';

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
    i18n.setLocale(FlowRouter.getParam("language"));
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      country: event.target.country.value,
      city: event.target.city.value,
    };
    Accounts.resetPassword(FlowRouter.getParam("token"), event.target.password.value, (error) => {
      if (error) {
        console.log(error);
      } else {
        Meteor.call('addEnrollmentInfo', params);
      }
    });
  }
  render() {
    return (
      <div>
        <LanguageSelector/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-md-offset-4 col-md-4">
            <div><input  type="password" name="password" placeholder={i18n.getTranslation('enrollAccount', 'password')}></input></div>
            <div><input type="password" name="confirmPassword" placeholder={i18n.getTranslation('enrollAccount', 'confirmPassword')}></input></div>
            <div><input type="text" name="country" placeholder={i18n.getTranslation('enrollAccount', 'country')}></input></div>
            <div><input type="text" name="city" placeholder={i18n.getTranslation('enrollAccount', 'city')}></input></div>
          </div>
          <div className="form-group col-md-offset-4 col-md-4">
            <input className="btn btn-success" type="submit" value={i18n.getTranslation('enrollAccount', 'register')}></input>
          </div>
        </form>
      </div>
    );
  }
}
