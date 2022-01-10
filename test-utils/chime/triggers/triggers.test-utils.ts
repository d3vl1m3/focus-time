import { act } from '@testing-library/react-hooks';
import { RenderResult } from '@testing-library/react-hooks/lib/types';

export const triggerChime = (chimeHookResult: RenderResult<{playChime: () => void}>) => {
  act(() => {
    chimeHookResult.current.playChime();
  });
};