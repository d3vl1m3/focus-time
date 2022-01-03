import { screen } from '@testing-library/react'

export const getNumberField = (name: string) => {
  const { getByRole } = screen;
  return getByRole('spinbutton', { name });
}

export const getSwitchToggle = (name: string) => {
  const { getByRole } = screen;
  return getByRole('switch', { name });
}