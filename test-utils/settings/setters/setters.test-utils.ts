import { act, fireEvent } from '@testing-library/react';

export const setInputFieldValue = (input: HTMLElement, value: string | string[] |number |number[] ) => {
  act(() => {
    fireEvent.input(input, { target: { value } });
  });
}