type MockMatchMediaType = {
  matches?: boolean,
  media?: string,
  onchange?: () => void,
  addListener?: typeof jest.fn, // Deprecated
  removeListener?: typeof jest.fn, // Deprecated
  addEventListener?: typeof jest.fn,
  removeEventListener?: typeof jest.fn,
  dispatchEvent?: typeof jest.fn,
}

export function setupMatchMediaMock({
  matches = false,
  media = '',
  onchange = () => null,
  addListener = jest.fn(), // Deprecated
  removeListener = jest.fn(), // Deprecated
  addEventListener = jest.fn(),
  removeEventListener = jest.fn(),
  dispatchEvent = jest.fn(),
}: MockMatchMediaType = {}): void {
  class MockMatchMedia {
    readonly matches: boolean = matches;
    readonly media: string = media;
    onchange?: () => void = onchange;
    addListener: typeof jest.fn = addListener; // Deprecated
    removeListener: typeof jest.fn = removeListener; // Deprecated
    addEventListener: typeof jest.fn = addEventListener;
    removeEventListener: typeof jest.fn = removeEventListener;
    dispatchEvent: typeof jest.fn = dispatchEvent;
  }

  Object.defineProperty(
    window,
    'matchMedia',
    {
      writable: true,
      configurable: true,
      value: () => new MockMatchMedia(),
    },
  );

  Object.defineProperty(
    global,
    'matchMedia',
    {
      writable: true,
      configurable: true,
      value: () => new MockMatchMedia(),
    },
  );
}
