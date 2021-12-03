import React from 'react';
import '../styles/globals.css';
import { MainLayout } from '../src/components/main-layout';

const MyApp = ({
  Component,
  ...props
}) => (
  <MainLayout>
    <Component {...props} />
  </MainLayout>
);
export default MyApp;
