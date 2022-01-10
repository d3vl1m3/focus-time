import chimeMp3 from '@assets/chime.mp3';
import { useSettingsStateContext } from '@contexts';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export type ChimeHookValues = () => { playChime: () => void};

export const useChime: ChimeHookValues = () => {
  const { isUseSound } = useSettingsStateContext();
  const [play, setPlay] = useState(false);

  const { current: Chime } = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(chimeMp3) : undefined,
  );

  useEffect(() => {
    if ( Chime ) {
      Chime.muted = !isUseSound;

      if ( play ) {
        if ( Chime.currentTime > 0 ) {
          Chime.pause();
          Chime.currentTime = 0;
        }

        Chime.play();

        setTimeout(() => {
          setPlay(false);
        }, 1000);
      }
    }

  }, [
    Chime,
    isUseSound,
    play,
  ]);

  return useMemo(() => ({
    playChime: () => setPlay(isUseSound),
  }), [isUseSound]);
};
