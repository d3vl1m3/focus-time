import { useSettingsPanelStateContext } from '@contexts';
import { HTMLAttributes, VoidFunctionComponent } from 'react';

export const OpenSettingsPanelButton: VoidFunctionComponent<HTMLAttributes<HTMLButtonElement>> = ({
  className = '',
}) => {
  const { openSettingsModal } = useSettingsPanelStateContext();
  return (
    <button
      className={`btn btn-secondary btn-sm ${className}`}
      type="button"
      onClick={openSettingsModal}
    >
      Settings
    </button>);
};
