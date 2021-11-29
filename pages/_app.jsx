import React from 'react';
import '../styles/globals.css';

const MyApp = ({
  Component,
  ...props
}) => (
  <div className="container mx-auto py-4">
    <Component {...props} />
  </div>
);
export default MyApp;
