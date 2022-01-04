import { GameStateProvider, useGameStateContext } from '@contexts';
import { renderHook } from '@testing-library/react-hooks';

describe('On initial load', () => {
  test('should render without errors when configured correctly', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useGameStateContext(),{ wrapper: GameStateProvider });

    expect(spyError).not.toHaveBeenCalled();
  });

  test('should render with errors when no provider supplied', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useGameStateContext());

    expect(spyError).toHaveBeenCalled();
  });
});