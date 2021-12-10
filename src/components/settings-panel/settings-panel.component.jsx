import React from 'react';
import { Dialog, Switch as HuiSwitch } from '@headlessui/react';
import styles from './settings-panel.module.css';
import { useSettingsPanelContext, useSettingsFormValuesContext } from './contexts';
import { Header, Footer } from './components';
import { Switch } from '../form-elements/switch/switch.component';
import { NumberInput } from '../form-elements/number-input/number-input.component';
import { useGameStateContext } from '../pomodoro-timer/contexts';

const settingsFormId = 'settings_form';

export const SettingsPanel = () => {
  const {
    isSettingsOpen,
    closeSettingsModal,
  } = useSettingsPanelContext();

  const {
    // Interval durations settings
    setFocusDuration,

    setShortBreakDuration,

    setLongBreakDuration,

    // Long break settings
    isUseLongBreaks,
    setIsUseLongBreaks,
    longBreakGap,
    setLongBreakGap,

    // Focus interval target settings
    isUseTargetFocusIntervals,
    setIsUseTargetFocusIntervals,
    targetFocusIntervals,
    setTargetFocusIntervals,

    // utility
    durationInMs,
  } = useGameStateContext();

  const {
    focusDurationInMinutes,
    focusDurationFormValue,
    setFocusDurationFormValue,
    shortBreakDurationInMinutes,
    shortBreakDurationFormValue,
    setShortBreakDurationFormValue,

    longBreakDurationInMinutes,
    isUseLongBreaksFormValue,
    setIsUseLongBreaksFormValue,
    longBreakDurationFormValue,
    setLongBreakDurationFormValue,
    longBreakGapFormValue,
    setLongBreakGapFormValue,

    isUseFocusIntervalTargetFormValue,
    setIsUseFocusIntervalTargetFormValue,
    focusIntervalTargetFormValue,
    setFocusIntervalTargetFormValue,
  } = useSettingsFormValuesContext();

  const saveSettings = (e) => {
    e.preventDefault();

    if (e.target.reportValidity()) {
      setFocusDuration(durationInMs(focusDurationFormValue));
      setShortBreakDuration(durationInMs(shortBreakDurationFormValue));

      setIsUseLongBreaks(isUseLongBreaksFormValue);
      setLongBreakDuration(durationInMs(longBreakDurationFormValue));
      setLongBreakGap(longBreakGapFormValue);

      setIsUseTargetFocusIntervals(isUseFocusIntervalTargetFormValue);
      setTargetFocusIntervals(focusIntervalTargetFormValue);

      closeSettingsModal();
    }
  };

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
          <form
            id={settingsFormId}
            onSubmit={saveSettings}
          >
            <fieldset className={styles.fieldset}>
              <div className={styles.fieldsetTop}>
                <legend className={styles.legend}>Interval durations</legend>
              </div>

              <NumberInput
                defaultValue={focusDurationInMinutes}
                id="focus_duration_length"
                max={99}
                min={1}
                placeholder="25"
                unit="minutes"
                onChange={(e) => setFocusDurationFormValue(e.target.value)}
              >
                Focus duration
              </NumberInput>

              <NumberInput
                defaultValue={shortBreakDurationInMinutes}
                id="short_break_duration_length"
                max={99}
                min={1}
                placeholder="5"
                unit="minutes"
                onChange={(e) => setShortBreakDurationFormValue(e.target.value)}
              >
                Short break duration
              </NumberInput>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className="sr-only">Long breaks</legend>

              <Switch
                as="fieldset"
                className={styles.fieldsetTop}
                defaultValue={isUseLongBreaks}
                onChange={(checked) => setIsUseLongBreaksFormValue(checked)}
              >
                <HuiSwitch.Label className={styles.legend}>Use long breaks</HuiSwitch.Label>
              </Switch>

              <NumberInput
                defaultValue={longBreakDurationInMinutes}
                id="long_break_duration_length"
                max={99}
                min={1}
                placeholder="10"
                unit="minutes"
                onChange={(e) => setLongBreakDurationFormValue(e.target.value)}
              >
                Long break duration
              </NumberInput>

              <NumberInput
                defaultValue={longBreakGap}
                id="long_break_gap"
                max={99}
                min={1}
                placeholder="10"
                unit="focus intervals"
                onChange={(e) => setLongBreakGapFormValue(e.target.value)}
              >
                Gap between long breaks
              </NumberInput>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className="sr-only">Focus intervals</legend>

              <Switch
                className={styles.fieldsetTop}
                defaultValue={isUseTargetFocusIntervals}
                onChange={(checked) => setIsUseFocusIntervalTargetFormValue(checked)}
              >
                <HuiSwitch.Label className={styles.legend}>Use a focus interval target</HuiSwitch.Label>
              </Switch>

              <NumberInput
                defaultValue={targetFocusIntervals}
                id="focus_interval_target"
                max={99}
                min={1}
                placeholder="8"
                unit="intervals"
                onChange={(e) => setFocusIntervalTargetFormValue(e.target.value)}
              >
                Focus interval target
              </NumberInput>
            </fieldset>
          </form>
        </main>
        <Footer
          className={styles.footer}
          submitFormTarget={settingsFormId}
        />
      </section>

    </Dialog>
  );
};
