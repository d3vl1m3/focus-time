import { SwitchWithIcons } from '@components/form-elements/switch-with-icons/switch-with-icons.component';
import { useSettingsStateContext } from '@contexts';
import { DarkMode, LightMode } from '@mui/icons-material';
import { VoidFunctionComponent } from 'react';

export const DarkModeToggle: VoidFunctionComponent = () => {
  const { isUseDarkMode, setIsUseDarkMode } = useSettingsStateContext();
  return (
    <SwitchWithIcons
      OffIcon={LightMode}
      OnIcon={DarkMode}
      id="isUseDarkMode"
      stateValue={isUseDarkMode}
      onChange={(checked:boolean) => setIsUseDarkMode(checked)}
    >
      <span className="sr-only">Use dark mode</span>
    </SwitchWithIcons>
  );
};
