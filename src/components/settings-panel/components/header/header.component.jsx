import React from 'react';
import { Dialog } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import { useSettingsPanelContext } from '../../contexts';
import styles from '../../settings-panel.module.css';

export const Header = ({ className }) => {
  const { closeSettingsModal } = useSettingsPanelContext();

  return (
    <header className={className}>
      <Dialog.Title className={styles.modalTitle}>Settings</Dialog.Title>
      <Dialog.Description className="sr-only">
        Here you can modify your interval lengths, add long breaks or add target goals for your total work intervals.
      </Dialog.Description>
      <button
        aria-label="close modal"
        type="button"
        onClick={closeSettingsModal}
      >
        <CloseIcon />
      </button>
    </header>
  );
};
