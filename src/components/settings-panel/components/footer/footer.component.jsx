import React from 'react';
import styles from './footer.module.css';
import { useSettingsPanelContext } from '../../contexts';

export const Footer = ({
  className,
  submitFormTarget,
}) => {
  const { closeSettingsModal } = useSettingsPanelContext();

  return (
    <footer className={className}>
      <button
        className={`btn ${styles.button} `}
        type="button"
        onClick={closeSettingsModal}
      >
        Cancel
      </button>
      <button
        className={`btn btn-success ${styles.button}`}
        form={submitFormTarget}
        type="submit"
      >
        Save
      </button>
    </footer>
  );
};
