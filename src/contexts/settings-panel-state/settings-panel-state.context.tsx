import { SetStateType } from '@types';
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from 'react';

export type SettingsPanelStateContextValues = {
  isSettingsOpen: boolean,
  setIsSettingsOpen: SetStateType<boolean>,
  closeSettingsModal: () => void,
  openSettingsModal: () => void,
};

const SettingsPanelStateContext = createContext<SettingsPanelStateContextValues | undefined>(undefined);

export const useSettingsPanelStateContext = () => {
  const context = useContext(SettingsPanelStateContext);
  if (context === undefined) {
    throw new Error('useSettingsPanelStateContext must be inside a SettingsPanelProvider');
  }

  return context;
};

export const SettingsPanelStateProvider: FunctionComponent = ({
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
