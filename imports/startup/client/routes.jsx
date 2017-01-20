import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import Register from '../../ui/layouts/Register';
import EnrollAccount from '../../ui/layouts/EnrollAccount';
import SignIn from '../../ui/layouts/SignIn';
import ButtonRegister from '../../ui/layouts/ButtonRegister';
import AddSmartRemote from '../../ui/layouts/AddSmartRemote';
import ForgotPassword from '../../ui/layouts/ForgotPassword';
import ResetPassword from '../../ui/layouts/ResetPassword';
import Top from '../../ui/layouts/Top';
import MyPage from '../../ui/layouts/MyPage';
import AddButtonPanel from '../../ui/layouts/AddButtonPanel';
import Error404Page from '../../ui/layouts/Error404Page';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={Top}/>
      <Route path="register" component={Register}/>
      <Route path="enroll-account/:token/:language" component={EnrollAccount}/>
      <Route path="button-register" component={ButtonRegister}/>
      <Route path="sign-in" component={SignIn}/>
      <Route path="add-smart-remote" component={AddSmartRemote}/>
      <Route path="forgot-password" component={ForgotPassword}/>
      <Route path="reset-password/:token/:language" component={ResetPassword}/>
      <Route path="my-page" component={MyPage}/>
      <Route path="my-page/:editMode/:buttonType/:buttonId" component={MyPage}/>
      <Route path="add-button-panel" component={AddButtonPanel}/>
      <Route path="*" component={Error404Page}/>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
