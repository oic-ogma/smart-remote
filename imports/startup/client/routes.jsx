import React from 'react';
import LanguageSelector from '../../ui/components/LanguageSelector.jsx';
import { mount } from 'react-mounter';
import { MainPage } from '../../ui/pages/MainPage.jsx';

FlowRouter.route('/', {
  action() {
    Tracker.autorun(function() {
      mount(MainPage, {
        content: (<LanguageSelector />),
      });
    });
  },
});
