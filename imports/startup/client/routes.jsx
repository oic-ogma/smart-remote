import React from 'react';
import { mount } from 'react-mounter';
import { MainPage } from '../../ui/pages/MainPage.jsx';
import Register from '../../ui/layouts/Register.jsx';
import EnrollAccount from '../../ui/layouts/EnrollAccount.jsx';

FlowRouter.route('/register', {
  action() {
    Tracker.autorun(() => {
      mount(MainPage, {
        content: (<Register />),
      });
    });
  },
});

FlowRouter.route('/enroll-account/:token', {
  action() {
    Tracker.autorun(() => {
      mount(MainPage, {
        content: (<EnrollAccount />),
      });
    });
  },
});
