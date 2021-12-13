import React, {
  createContext, FunctionComponent, useContext, useMemo, useState,
} from 'react';
import {SetStateType} from "../../../../types/set-state/set-state.type";

type SettingsPanelStateContextValues = {
  isSettingsOpen: boolean,
  setIsSettingsOpen: SetStateType<boolean>,
  closeSettingsModal: () => void,
  openSettingsModal: () => void,
}

const SettingsPanelStateContext = createContext<SettingsPanelStateContextValues | undefined>(undefined);

export const useSettingsPanelContext = () => {
  const context = useContext(SettingsPanelStateContext);
  if (context === undefined) {
    throw new Error('useSettingsPanelContext must be inside a SettingsPanelProvider');
  }

  return context;
};

export const SettingsPanelProvider: FunctionComponent = ({children}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const closeSettingsModal = () => setIsSettingsOpen(false);
  const openSettingsModal = () => setIsSettingsOpen(true);

  const values = useMemo(() => ({
    isSettingsOpen,
    setIsSettingsOpen,
    closeSettingsModal,
    openSettingsModal,
  }), [isSettingsOpen, setIsSettingsOpen, closeSettingsModal, openSettingsModal]);

  return (
    <SettingsPanelStateContext.Provider value={values}>
      {children}
    </SettingsPanelStateContext.Provider>
  );
};
