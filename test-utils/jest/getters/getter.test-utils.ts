import { screen } from '@testing-library/react';

export const getButtonByName= (name: string) => {
  const { getByRole } = screen;
  return getByRole('button', { name });
};
