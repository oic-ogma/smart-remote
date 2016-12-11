import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import Register from '../../ui/layouts/Register.jsx';
import EnrollAccount from '../../ui/layouts/EnrollAccount.jsx';
import SignIn from '../../ui/layouts/SignIn.jsx';
import AddButtonPanel from '../../ui/layouts/AddButtonPanel.jsx';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="register" component={Register}/>
      <Route path="enroll-account/:token/:language" component={EnrollAccount}/>
      <Route path="sign-in" component={SignIn}/>
      <Route path="add-button-panel" component={AddButtonPanel}/>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
