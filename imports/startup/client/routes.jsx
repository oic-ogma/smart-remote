import React from 'react';
import Register from '../../ui/layouts/Register.jsx';
import EnrollAccount from '../../ui/layouts/EnrollAccount.jsx';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="register" component={Register}/>
      <Route path="enroll-account/:token/:language" component={EnrollAccount}/>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
