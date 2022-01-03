import { SettingsPanelProvider } from "@contexts";
import { render } from '@testing-library/react';

import { Header } from './header.component';

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    render(
      <SettingsPanelProvider>
        <Header/>
      </SettingsPanelProvider>,
    );
    expect(spyError).not.toHaveBeenCalled();
  });
});
