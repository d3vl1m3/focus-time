import { SwitchWithIcons } from '@components/form-elements/switch-with-icons/switch-with-icons.component';
import { useSettingsStateContext } from '@contexts';
import { VolumeOff, VolumeUp } from '@mui/icons-material';
import { VoidFunctionComponent } from 'react';

export const SoundToggle:VoidFunctionComponent = () => {
  const { isUseSound, setIsUseSound } = useSettingsStateContext();
  return <SwitchWithIcons
    OffIcon={VolumeOff}
    OnIcon={VolumeUp}
    defaultValue={isUseSound}
    id="isUseSound"
    stateValue={isUseSound}
    onChange={(checked) => setIsUseSound(checked)}
  >
    <span className="sr-only">Use sound</span>
  </SwitchWithIcons>;
};
