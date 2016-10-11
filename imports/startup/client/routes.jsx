import React from 'react';
import { mount } from 'react-mounter';
import { MainPage } from '../../ui/pages/MainPage.jsx';

FlowRouter.route('/', {
  action() {
    Tracker.autorun(function() {
      mount(MainPage, {

      });
    });
  }
});
