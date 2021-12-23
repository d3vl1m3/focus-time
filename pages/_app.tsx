import '../styles/globals.css';
import { VoidFunctionComponent } from 'react';

import { MainLayout } from '../src/components';

interface MyAppProps {
  Component: VoidFunctionComponent
}

const MyApp: VoidFunctionComponent<MyAppProps> = (
  {
    Component,
    ...props
  }) => (
  <MainLayout>
    <Component {...props} />
  </MainLayout>
);
export default MyApp;
