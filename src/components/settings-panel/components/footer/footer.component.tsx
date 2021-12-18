import styles from './footer.module.css';
import {HTMLAttributes, VoidFunctionComponent} from 'react';
import {useSettingsPanelContext} from '../../contexts';

interface FooterProps extends HTMLAttributes<HTMLElement> {
  formId: string
}

export const Footer: VoidFunctionComponent<FooterProps> = (
  {
    className = '',
    formId,
    ...props
  }) => {
  const {closeSettingsModal} = useSettingsPanelContext();

  return (
    <footer className={`${styles.footer} ${className}`} {...props}>
      <button
        className="btn"
        type="button"
        onClick={closeSettingsModal}
      >
        Cancel
      </button>
      <button
        className={`btn btn-success ${styles.saveButton}`}
        form={formId}
        type="submit"
      >
        Save
      </button>
    </footer>
  );
};
