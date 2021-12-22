import { Dialog } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import { HTMLAttributes, VoidFunctionComponent } from 'react';
import { useSettingsPanelContext } from '../../contexts';
import styles from './header.module.css';

export const Header: VoidFunctionComponent<HTMLAttributes<HTMLElement>> = () => {
  const { closeSettingsModal } = useSettingsPanelContext();

  return (
    <header className={styles.header}>
      <Dialog.Title className={styles.modalTitle}>Settings</Dialog.Title>
      <Dialog.Description className="sr-only">
        Here you can modify your interval lengths, add long breaks or add target goals for your total focus intervals.
      </Dialog.Description>
      <button
        aria-label="close modal"
        type="button"
        onClick={closeSettingsModal}
      >
        <CloseIcon/>
      </button>
    </header>
  );
};
