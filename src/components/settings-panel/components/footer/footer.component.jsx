import React from 'react';
import { useSettingsPanelContext } from '../../contexts';

export const Footer = ({ className }) => {
  const { closeSettingsModal } = useSettingsPanelContext();

  return (
    <footer className={className}>
      <button
        className="btn"
        type="button"
        onClick={closeSettingsModal}
      >
        Cancel
      </button>
      <button
        className="btn btn-success"
        type="button"
      >
        Save
      </button>
    </footer>
  );
};
