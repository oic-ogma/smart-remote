import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

export default class Login extends React.Component {
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
    let emailVar = event.target.registerEmail.value;
    Meteor.call('sendEnrollmentEmail', i18n.getLocale(), emailVar, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-md-offset-4 col-md-4">
            <input  type="email" name="registerEmail" placeholder={i18n.getTranslation('register', 'email')}></input>
          </div>
          <div className="form-group col-md-offset-4 col-md-4">
            <input className="btn btn-success" type="submit" value={i18n.getTranslation('register', 'register')}></input>
          </div>
        </form>
      </div>
    );
  }
}
