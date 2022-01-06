import chime from '@assets/chime.mp3';
import { useSettingsStateContext } from '@contexts';
import {
  useEffect, useMemo, useState, 
} from 'react';

export const useChime = () => {
  const { isUseSound } = useSettingsStateContext();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const Chime = new Audio(chime);
    if ( play && Chime.paused && isUseSound ) {
      Chime.play();
    }
    Chime.onended = () => setPlay(false);
  }, [
    isUseSound,
    play,
  ]);

  return useMemo(() => ({
    playChime: () => setPlay(isUseSound),
  }), [isUseSound]);
};
