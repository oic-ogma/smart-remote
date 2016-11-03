import React from 'react';
import LanguageSelector from '../components/LanguageSelector.jsx';

export const MainPage = ({content}) => (
  <div>
    <LanguageSelector/>
    {content}
  </div>
);
