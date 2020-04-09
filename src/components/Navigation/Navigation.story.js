import React from 'react';
import Navigation from './Navigation';

export default {
  title: 'Navigation',
  component: Navigation
};

export const navigation = () => (
  <Navigation
    links={[
      { to: 'listen', text: 'Listen' },
      { to: 'charts', text: 'Charts' },
      { to: 'about', text: 'About Tjoonz' },
      { to: 'about/uploading', text: 'About Uploading' },
      { to: 'about/contributing', text: 'Become an Editor' },
      { to: 'thanks', text: 'Special Thanks' },
      { to: 'privacy-policy', text: 'Privacy Policy' },
      { to: 'about/feedback', text: 'Feedback' }
    ]}
  />
);
