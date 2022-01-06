import { SettingsStateContext } from '@contexts/settings-state/settings-state.context';
import { useContext } from 'react';

export const useSettingsStateContext = () => {
  const context = useContext(SettingsStateContext);
  if (context === undefined) {
    throw new Error('useSettingsStateContext must be inside a SettingsStateProvider');
  }

  return context;
};