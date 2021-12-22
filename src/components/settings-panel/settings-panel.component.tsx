import {Dialog, Switch as HuiSwitch} from '@headlessui/react';
import {FormEvent, VoidFunctionComponent} from 'react';
import {NumberInput} from '../form-elements/number-input/number-input.component';
import {Switch} from '../form-elements/switch/switch.component';
import {useGameStateContext} from '../pomodoro-timer/contexts';
import {Footer, Header} from './components';
import {useSettingsFormValuesContext, useSettingsPanelContext} from './contexts';
import styles from './settings-panel.module.css';

const settingsFormId = 'settings_form';

export const SettingsPanel: VoidFunctionComponent = () => {
  const {
    isSettingsOpen,
    closeSettingsModal,
  } = useSettingsPanelContext();

  const {
    // Interval durations settings
    focusDuration,
    setFocusDuration,

    shortBreakDuration,
    setShortBreakDuration,

    longBreakDuration,
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
    durationInMinutes,
  } = useGameStateContext();

  const {

    // Interval durations settings
    focusDurationFormValue,
    setFocusDurationFormValue,

    shortBreakDurationFormValue,
    setShortBreakDurationFormValue,

    longBreakDurationFormValue,
    setLongBreakDurationFormValue,

    // Long break settings
    isUseLongBreaksFormValue,
    setIsUseLongBreaksFormValue,
    longBreakGapFormValue,
    setLongBreakGapFormValue,

    // Focus interval target settings
    isUseFocusIntervalTargetFormValue,
    setIsUseFocusIntervalTargetFormValue,
    focusIntervalTargetFormValue,
    setFocusIntervalTargetFormValue,
  } = useSettingsFormValuesContext();

  const saveSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // annoyingly `checkValidity` is not showing unless I do this
    const form = e.target as HTMLFormElement;

    if (form.checkValidity()) {
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
                defaultValue={durationInMinutes(focusDuration)}
                id="focus_duration_length"
                max="99"
                min="1"
                placeholder="25"
                unit="minutes"
                onChange={(e) => setFocusDurationFormValue(parseInt(e.target.value))}
              >
                Focus duration
              </NumberInput>

              <NumberInput
                defaultValue={durationInMinutes(shortBreakDuration)}
                id="short_break_duration_length"
                max="99"
                min="1"
                placeholder="5"
                unit="minutes"
                onChange={(e) => setShortBreakDurationFormValue(parseInt(e.target.value))}
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
                defaultValue={durationInMinutes(longBreakDuration)}
                id="long_break_duration_length"
                max="99"
                min="1"
                placeholder="10"
                unit="minutes"
                onChange={(e) => setLongBreakDurationFormValue(parseInt(e.target.value))}
              >
                Long break duration
              </NumberInput>

              <NumberInput
                defaultValue={longBreakGap}
                id="long_break_gap"
                max="99"
                min="1"
                placeholder="10"
                unit="focus intervals"
                onChange={(e) => setLongBreakGapFormValue(parseInt(e.target.value))}
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
                max="99"
                min="1"
                placeholder="8"
                unit="intervals"
                onChange={(e) => setFocusIntervalTargetFormValue(parseInt(e.target.value))}
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
