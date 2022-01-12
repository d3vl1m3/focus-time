import { Switch, SwitchProps } from "@components/form-elements/switch/switch.component";
import { FunctionComponent } from "react";

import styles from './switch-with-icons.module.css';

interface SwitchWithIconsProps extends SwitchProps {
  OffIcon: FunctionComponent,
  OnIcon: FunctionComponent,
}

export const SwitchWithIcons: FunctionComponent<SwitchWithIconsProps> = ({
  children,
  OffIcon,
  OnIcon,
  ...props
}) => (
  <div className={styles.container}>
    <OffIcon />

    <Switch
      {...props}
    >
      { children }
    </Switch>

    <OnIcon />
  </div>
);
