import {createContext, FunctionComponent, useContext, useMemo, useState} from 'react';
import {SetStateType} from '../../../../types/set-state/set-state.type';

type SettingsPanelStateContextValues = {
  isSettingsOpen: boolean,
  setIsSettingsOpen: SetStateType<boolean>,
  closeSettingsModal: () => void,
  openSettingsModal: () => void,
};

const SettingsPanelStateContext = createContext<SettingsPanelStateContextValues | undefined>(undefined);

export const useSettingsPanelContext = () => {
  const context = useContext(SettingsPanelStateContext);
  if (context === undefined) {
    throw new Error('useSettingsPanelContext must be inside a SettingsPanelProvider');
  }

  return context;
};

export const SettingsPanelProvider: FunctionComponent = ({
  children,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const values = useMemo(() => {
    const closeSettingsModal = () => setIsSettingsOpen(false);
    const openSettingsModal = () => setIsSettingsOpen(true);

    return {
      isSettingsOpen,
      setIsSettingsOpen,
      closeSettingsModal,
      openSettingsModal,
    };
  }, [isSettingsOpen, setIsSettingsOpen]);

  return (
    <SettingsPanelStateContext.Provider value={values}>
      {children}
    </SettingsPanelStateContext.Provider>
  );
};
