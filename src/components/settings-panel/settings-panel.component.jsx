import React from 'react';
import { Dialog } from '@headlessui/react';
import styles from './settings-panel.module.css';
import { useSettingsPanelContext } from './contexts';

export const SettingsPanel = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
  } = useSettingsPanelContext();

  return (
    <Dialog
      className={styles.portal}
      open={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
    >
      <Dialog.Overlay className={styles.overlay} />

      <div className={styles.modal}>
        <Dialog.Title>Settings</Dialog.Title>
      </div>

    </Dialog>
  );
};
