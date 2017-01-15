import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import Register from '../../ui/layouts/Register.jsx';
import EnrollAccount from '../../ui/layouts/EnrollAccount.jsx';
import SignIn from '../../ui/layouts/SignIn.jsx';
import ForgotPassword from '../../ui/layouts/ForgotPassword.jsx';
import ResetPassword from '../../ui/layouts/ResetPassword.jsx';
import Top from '../../ui/layouts/Top';
import Error404Page from '../../ui/layouts/Error404Page';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={Top}/>
      <Route path="register" component={Register}/>
      <Route path="enroll-account/:token/:language" component={EnrollAccount}/>
      <Route path="sign-in" component={SignIn}/>
      <Route path="forgot-password" component={ForgotPassword}/>
      <Route path="reset-password/:token/:language" component={ResetPassword}/>
      <Route path="*" component={Error404Page}/>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
