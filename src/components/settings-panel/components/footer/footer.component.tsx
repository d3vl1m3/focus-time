import { useSettingsPanelStateContext } from '@contexts';
import {
  HTMLAttributes,
  VoidFunctionComponent,
} from 'react';

import styles from '../../settings-panel.module.css';

interface FooterProps extends HTMLAttributes<HTMLElement> {
  formId: string;
}

export const Footer: VoidFunctionComponent<FooterProps> = ({
  formId,
  ...props
}) => {
  const { closeSettingsModal } = useSettingsPanelStateContext();

  return (
    <footer
      className={`${styles.footer}`}
      {...props}
    >
      <button
        className={`btn ${styles.footerButton}`}
        type="button"
        onClick={closeSettingsModal}
      >
        Cancel
      </button>
      <button
        className={`btn btn-success ${styles.saveButton} ${styles.footerButton}`}
        form={formId}
        type="submit"
      >
        Save
      </button>
    </footer>
  );
};
