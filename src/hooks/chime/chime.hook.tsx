import chime from '@assets/chime.mp3';
import { useSettingsStateContext } from '@contexts';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

export type ChimeHookValues = () => { playChime: () => void};

export const useChime: ChimeHookValues = () => {
  const { isUseSound } = useSettingsStateContext();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const Chime = new Audio(chime);

    if ( play && isUseSound ) {
      Chime.play();

      setTimeout(() => {
        setPlay(false);
      }, 3000);
    }

  }, [
    isUseSound,
    play,
  ]);

  return useMemo(() => ({
    playChime: () => setPlay(isUseSound),
  }), [isUseSound]);
};
