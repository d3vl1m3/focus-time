import '../styles/globals.css';
import {MainLayout} from '../src/components';
import {VoidFunctionComponent} from 'react';

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
