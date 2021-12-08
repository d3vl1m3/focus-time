import React, {
  createContext, useContext, useMemo, useState,
} from 'react';

const SettingsPanelContext = createContext(undefined);

export const useSettingsPanelContext = () => {
  const context = useContext(SettingsPanelContext);
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
    <SettingsPanelContext.Provider value={values}>
      {children}
    </SettingsPanelContext.Provider>
  );
};
