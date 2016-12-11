import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import Register from '../../ui/layouts/Register.jsx';
import EnrollAccount from '../../ui/layouts/EnrollAccount.jsx';
import SignIn from '../../ui/layouts/SignIn.jsx';
import IrTest from '../../ui/components/IrTest';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="register" component={Register}/>
      <Route path="enroll-account/:token/:language" component={EnrollAccount}/>
      <Route path="sign-in" component={SignIn}/>
      <Route path="ir-test" component={IrTest}/>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
