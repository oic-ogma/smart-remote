import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
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
            <input  type="email" name="registerEmail" placeholder="Email"></input>
          </div>
          <div className="form-group col-md-offset-4 col-md-4">
            <input className="btn btn-success" type="submit" value="Register"></input>
          </div>
        </form>
      </div>
    );
  }
}
