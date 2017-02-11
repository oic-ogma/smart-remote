import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import LoggedOut from '../../ui/layouts/LoggedOut';
import LoggedIn from '../../ui/layouts/LoggedIn';
import Register from '../../ui/pages/Register';
import EnrollAccount from '../../ui/pages/EnrollAccount';
import SignIn from '../../ui/pages/SignIn';
import ButtonRegister from '../../ui/pages/ButtonRegister';
import AddSmartRemote from '../../ui/pages/AddSmartRemote';
import ForgotPassword from '../../ui/pages/ForgotPassword';
import ResetPassword from '../../ui/pages/ResetPassword';
import Top from '../../ui/pages/Top';
import MyPage from '../../ui/pages/MyPage';
import AddButtonPanel from '../../ui/pages/AddButtonPanel';
import Error404Page from '../../ui/pages/Error404Page';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path='/' component={LoggedOut}>
        <IndexRoute component={Top}/>
        <Route path='sign-in' component={SignIn}/>
        <Route path='register' component={Register}/>
        <Route path='enroll-account/:token/:language' component={EnrollAccount}/>
        <Route path='forgot-password' component={ForgotPassword}/>
        <Route path='reset-password/:token/:language' component={ResetPassword}/>
      </Route>

      <Route path='my-page' component={LoggedIn}>
        <IndexRoute component={MyPage}/>
        <Route path=':editMode/:buttonType/:buttonId' component={MyPage}/>
        <Route path='button-register' component={ButtonRegister}/>
        <Route path='add-smart-remote' component={AddSmartRemote}/>
        <Route path='add-button-panel' component={AddButtonPanel}/>
      </Route>

      <Route path='*' component={Error404Page}/>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
