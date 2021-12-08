import React, {
  createContext, useContext, useMemo, useState,
} from 'react';

const SettingsPanelStateContext = createContext(undefined);

export const useSettingsPanelContext = () => {
  const context = useContext(SettingsPanelStateContext);
  if (context === undefined) {
    throw new Error('useSettingsPanelContext must be inside a SettingsPanelProvider');
  }

  return context;
};

export const SettingsPanelProvider = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const values = useMemo(() => ({
    isSettingsOpen,
    setIsSettingsOpen,
  }), [isSettingsOpen, setIsSettingsOpen]);

  return (
    <SettingsPanelStateContext.Provider value={values}>
      {children}
    </SettingsPanelStateContext.Provider>
  );
};
