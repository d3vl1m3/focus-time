import React from 'react';
import '../styles/globals.css';

const MyApp = ({ Component, ...props }) => <Component {...props} />;
export default MyApp;
