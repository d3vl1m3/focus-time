import styles from './footer.module.css';
import {VoidFunctionComponent} from 'react';
import {useSettingsPanelContext} from '../../contexts';
import {HTMLAttributes} from 'react';

interface FooterProps extends HTMLAttributes<HTMLElement> {
  formId: string
}

export const Footer: VoidFunctionComponent<FooterProps> = ({
  className = '',
  formId,
  ...props
}) => {
  const {closeSettingsModal} = useSettingsPanelContext();

  return (
    <footer className={className} {...props}>
      <button
        className={`btn ${styles.button} `}
        type="button"
        onClick={closeSettingsModal}
      >
        Cancel
      </button>
      <button
        className={`btn btn-success ${styles.button}`}
        form={formId}
        type="submit"
      >
        Save
      </button>
    </footer>
  );
};
