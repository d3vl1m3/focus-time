import '../styles/globals.css';
import { VoidFunctionComponent } from 'react';

interface MyAppProps {
  Component: VoidFunctionComponent
}

const MyApp: VoidFunctionComponent<MyAppProps> = (
  {
    Component,
    ...props
  }) => (
  <Component {...props} />
);
export default MyApp;
