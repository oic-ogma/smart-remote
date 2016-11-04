import React from 'react';
import { Meteor } from 'meteor/meteor';
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
    Accounts.resetPassword(FlowRouter.getParam("token"), event.target.password.value, (error) => {
      if ( error ) {
        console.log("失敗");
      }
    });
  }
  render() {
    return (
      <div>
        <LanguageSelector/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-md-offset-4 col-md-4">
            <input  type="password" name="password" placeholder={i18n.getTranslation('enrollAccount', 'password')}></input>
          </div>
          <div className="form-group col-md-offset-4 col-md-4">
            <input className="btn btn-success" type="submit" value={i18n.getTranslation('enrollAccount', 'register')}></input>
          </div>
        </form>
      </div>
    );
  }
}
