export const msToTimer = (timeInMs: number): string => {
  const minutes = (`0${Math.floor((timeInMs / 1000 / 60))}`).slice(-2);
  const seconds = (`0${Math.floor((timeInMs / 1000) % 60)}`).slice(-2);

  return `${minutes}:${seconds}`;
};
