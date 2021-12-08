import React from 'react';
import { Dialog, Switch as HuiSwitch } from '@headlessui/react';
import styles from './settings-panel.module.css';
import { useSettingsPanelContext } from './contexts';
import { Header, Footer } from './components';
import { Switch } from '../form-elements/switch/switch.component';
import { NumberInput } from '../form-elements/number-input/number-input.component';

export const SettingsPanel = () => {
  const {
    isSettingsOpen,
    closeSettingsModal,
  } = useSettingsPanelContext();

  return (
    <Dialog
      className={styles.portal}
      open={isSettingsOpen}
      onClose={closeSettingsModal}
    >
      <Dialog.Overlay className={styles.overlay} />

      <section className={styles.modal}>

        <Header className={styles.header} />

        <main>
          <form>
            <fieldset className={styles.fieldset}>
              <div className={styles.fieldsetTop}>
                <legend className={styles.legend}>Interval durations</legend>
              </div>
              <NumberInput
                id="work_duration_length"
                max={99}
                min={1}
                placeholder="25"
                unit="minutes"
              >
                Work duration
              </NumberInput>
              <NumberInput
                id="short_break_duration_length"
                max={99}
                min={1}
                placeholder="5"
                unit="minutes"
              >
                Short break duration
              </NumberInput>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend className="sr-only">Long breaks</legend>

              <Switch
                as="fieldset"
                className={styles.fieldsetTop}
              >
                <HuiSwitch.Label className={styles.legend}>Use long breaks</HuiSwitch.Label>
              </Switch>
              <NumberInput
                id="long_break_duration_length"
                max={99}
                min={1}
                placeholder="10"
                unit="minutes"
              >
                Long break duration
              </NumberInput>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend className="sr-only">Work intervals</legend>
              <Switch className={styles.fieldsetTop}>
                <HuiSwitch.Label className={styles.legend}>Use a work interval target</HuiSwitch.Label>
              </Switch>
              <NumberInput
                id="work_interval_target"
                max={99}
                min={1}
                placeholder="8"
                unit="intervals"
              >
                Work interval target
              </NumberInput>
            </fieldset>
          </form>
        </main>

        <Footer className={styles.footer} />
      </section>

    </Dialog>
  );
};
