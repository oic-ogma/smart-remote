import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import Register from '../../ui/layouts/Register';
import EnrollAccount from '../../ui/layouts/EnrollAccount';
import SignIn from '../../ui/layouts/SignIn';
import ButtonRegister from '../../ui/layouts/ButtonRegister';
import AddPhoton from '../../ui/layouts/AddPhoton';
import ForgotPassword from '../../ui/layouts/ForgotPassword';
import ResetPassword from '../../ui/layouts/ResetPassword';
import Top from '../../ui/layouts/Top';
import Error404Page from '../../ui/layouts/Error404Page';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={Top}/>
      <Route path="register" component={Register}/>
      <Route path="enroll-account/:token/:language" component={EnrollAccount}/>
      <Route path="button-register" component={ButtonRegister}/>
      <Route path="sign-in" component={SignIn}/>
      <Route path="add-photon" component={AddPhoton}/>
      <Route path="forgot-password" component={ForgotPassword}/>
      <Route path="reset-password/:token/:language" component={ResetPassword}/>
      <Route path="*" component={Error404Page}/>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
