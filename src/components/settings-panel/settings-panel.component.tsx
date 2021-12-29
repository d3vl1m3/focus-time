import { Dialog, Switch as HuiSwitch } from '@headlessui/react';
import { FormEvent, VoidFunctionComponent } from 'react';

import { minutesToMs } from '../../utility/functions';
import { NumberInput } from '../form-elements/number-input/number-input.component';
import { Switch } from '../form-elements/switch/switch.component';
import { useGameStateContext } from '../pomodoro-timer/contexts';

import { Footer, Header } from './components';
import { useSettingsFormValuesContext, useSettingsPanelContext } from './contexts';
import styles from './settings-panel.module.css';

const settingsFormId = 'settings_form';

export const SettingsPanel: VoidFunctionComponent = () => {
  const {
    isSettingsOpen,
    closeSettingsModal,
  } = useSettingsPanelContext();

  const {
    setFocusDuration,
    setShortBreakDuration,
    setLongBreakDuration,

    setIsUseLongBreaks,
    setLongBreakGap,

    setIsUseFocusIntervalsTarget,
    setFocusIntervalsTarget,
  } = useGameStateContext();

  const {
    settingsFormValues,
    updateSettingsFormValue,
  } = useSettingsFormValuesContext();

  const saveSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // annoyingly `checkValidity` is not showing unless I do this
    const form = e.target as HTMLFormElement;

    if (form.checkValidity()) {
      setFocusDuration(
        minutesToMs(settingsFormValues['focus_duration']),
      );

      setShortBreakDuration(
        minutesToMs(settingsFormValues['short_break_duration']),
      );

      setIsUseLongBreaks(
        settingsFormValues['is_use_long_breaks'],
      );

      setLongBreakDuration(
        minutesToMs(settingsFormValues['long_break_duration']),
      );

      setLongBreakGap(
        settingsFormValues['long_break_gap'],
      );

      setIsUseFocusIntervalsTarget(
        settingsFormValues['is_use_focus_intervals_target'],
      );

      setFocusIntervalsTarget(
        settingsFormValues['focus_intervals_target'],
      );

      closeSettingsModal();
    }
  };

  return (
    <Dialog
      className={styles.portal}
      open={isSettingsOpen}
      onClose={closeSettingsModal}
    >
      <Dialog.Overlay className={styles.overlay}/>

      <section className={styles.modal}>

        <Header/>

        <main className={styles.main}>
          <form
            id={settingsFormId}
            onSubmit={(e) => saveSettings(e)}
          >
            <fieldset className={styles.fieldset}>
              <div className={styles.fieldsetTop}>
                <legend className={styles.legend}>Interval durations</legend>
              </div>

              <NumberInput
                defaultValue={settingsFormValues['focus_duration']}
                id="focus_duration"
                max="99"
                min="1"
                placeholder="25"
                unit="minutes"
                onChange={(e) => updateSettingsFormValue('focus_duration', parseInt(e.target.value))}
              >
                Focus duration
              </NumberInput>

              <NumberInput
                defaultValue={settingsFormValues['short_break_duration']}
                id="short_break_duration"
                max="99"
                min="1"
                placeholder="5"
                unit="minutes"
                onChange={(e) => updateSettingsFormValue('short_break_duration', parseInt(e.target.value))}
              >
                Short break duration
              </NumberInput>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className="sr-only">Long breaks</legend>

              <Switch
                as="fieldset"
                className={styles.fieldsetTop}
                defaultValue={settingsFormValues['is_use_long_breaks']}
                id="is_use_long_break"
                onChange={(checked) => updateSettingsFormValue('is_use_long_breaks', checked)}
              >
                <HuiSwitch.Label className={styles.legend}>Use long breaks</HuiSwitch.Label>
              </Switch>

              <NumberInput
                defaultValue={settingsFormValues['long_break_duration']}
                id="long_break_duration"
                max="99"
                min="1"
                placeholder="10"
                unit="minutes"
                onChange={(e) => updateSettingsFormValue('long_break_duration', parseInt(e.target.value))}
              >
                Long break duration
              </NumberInput>

              <NumberInput
                defaultValue={settingsFormValues['long_break_gap']}
                id="long_break_gap"
                max="99"
                min="1"
                placeholder="10"
                unit="focus intervals"
                onChange={(e) => updateSettingsFormValue('long_break_gap', parseInt(e.target.value))}
              >
                Gap between long breaks
              </NumberInput>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className="sr-only">Focus intervals</legend>

              <Switch
                className={styles.fieldsetTop}
                defaultValue={settingsFormValues['is_use_focus_intervals_target']}
                id="is_use_focus_intervals_target"
                onChange={(checked) => updateSettingsFormValue('is_use_focus_intervals_target', checked)}
              >
                <HuiSwitch.Label className={styles.legend}>Use a focus intervals target</HuiSwitch.Label>
              </Switch>

              <NumberInput
                defaultValue={settingsFormValues['focus_intervals_target']}
                id="focus_intervals_target"
                max="99"
                min="1"
                placeholder="8"
                unit="intervals"
                onChange={(e) => updateSettingsFormValue('focus_intervals_target', parseInt(e.target.value))}
              >
                Focus interval target
              </NumberInput>
            </fieldset>
          </form>
        </main>
        <Footer
          className={styles.footer}
          formId={settingsFormId}
        />
      </section>

    </Dialog>
  );
};
