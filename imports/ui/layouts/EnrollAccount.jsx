import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class EnrollAccount extends React.Component {
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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-md-offset-4 col-md-4">
            <input  type="password" name="password" placeholder="Password"></input>
          </div>
          <div className="form-group col-md-offset-4 col-md-4">
            <input className="btn btn-success" type="submit" value="Register"></input>
          </div>
        </form>
      </div>
    );
  }
}
