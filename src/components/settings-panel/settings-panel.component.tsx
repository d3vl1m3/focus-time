import { NumberInput } from '@components/form-elements/number-input/number-input.component';
import { Switch } from '@components/form-elements/switch/switch.component';
import {
  useSettingsFormStateContext,
  useSettingsPanelStateContext,
} from '@contexts';
import { useSettingsStateContext } from '@contexts';
import {
  Dialog,
  Switch as HuiSwitch,
} from '@headlessui/react';
import {
  FormEvent,
  VoidFunctionComponent,
} from 'react';

import {
  Footer,
  Header, 
} from './components';
import styles from './settings-panel.module.css';

const settingsFormId = 'settings_form';

export const SettingsPanel: VoidFunctionComponent = () => {
  const {
    closeSettingsModal,
    isSettingsOpen,
  } = useSettingsPanelStateContext();

  const {
    focusDuration,
    focusIntervalsTarget,
    isUseFocusIntervalsTarget,
    isUseLongBreaks,
    longBreakDuration,
    longBreakGap,
    setFocusDuration,
    setFocusIntervalsTarget,
    setIsUseFocusIntervalsTarget,
    setIsUseLongBreaks,
    setIsUseSound,
    setLongBreakDuration,
    setLongBreakGap,
    setShortBreakDuration,
    shortBreakDuration,
  } = useSettingsStateContext();

  const {
    settingsFormValues,
    updateSettingsFormValue,
  } = useSettingsFormStateContext();

  const saveSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // annoyingly `checkValidity` is not showing unless I do this
    const form = e.target as HTMLFormElement;

    if (form.checkValidity()) {
      const {
        focusDuration,
        focusIntervalsTarget,
        isUseFocusIntervalsTarget,
        isUseLongBreaks,
        longBreakDuration,
        longBreakGap,
        shortBreakDuration,
        isUseSound,
      } = settingsFormValues;

      setFocusDuration(focusDuration);
      setShortBreakDuration(shortBreakDuration);

      setIsUseLongBreaks(isUseLongBreaks);
      setLongBreakDuration(longBreakDuration);
      setLongBreakGap(longBreakGap);

      setIsUseFocusIntervalsTarget(isUseFocusIntervalsTarget);
      setFocusIntervalsTarget(focusIntervalsTarget);

      setIsUseSound(isUseSound);

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

      <section className="modal">
        <Header/>

        <form
          id={settingsFormId}
          onSubmit={(e) => saveSettings(e)}
        >
          <fieldset className={styles.fieldset}>
            <div className={styles.fieldsetTop}>
              <legend className={styles.legend}>Interval durations</legend>
            </div>

            <NumberInput
              defaultValue={focusDuration}
              id="focusDuration"
              max="99"
              min="1"
              placeholder="25"
              required={true}
              unit="minutes"
              onChange={(e) => updateSettingsFormValue('focusDuration', parseInt(e.target.value))
              }
            >
              Focus duration
              {' '}
              <span className="sr-only">in minutes</span>
            </NumberInput>

            <NumberInput
              defaultValue={shortBreakDuration}
              id="shortBreakDuration"
              max="99"
              min="1"
              placeholder="5"
              required={true}
              unit="minutes"
              onChange={(e) => updateSettingsFormValue('shortBreakDuration', parseInt(e.target.value))
              }
            >
              Short break duration
              {' '}
              <span className="sr-only">in minutes</span>
            </NumberInput>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className="sr-only">Long breaks</legend>

            <Switch
              as="fieldset"
              className={styles.fieldsetTop}
              defaultValue={isUseLongBreaks}
              id="isUseLongBreaks"
              onChange={(checked) => updateSettingsFormValue('isUseLongBreaks', checked)}
            >
              <HuiSwitch.Label className={styles.legend}>Use long breaks</HuiSwitch.Label>
            </Switch>

            <NumberInput
              defaultValue={longBreakDuration}
              id="longBreakDuration"
              max="99"
              min="1"
              placeholder="10"
              required={true}
              unit="minutes"
              onChange={(e) => e.target.checkValidity()
                ? updateSettingsFormValue('longBreakDuration', parseInt(e.target.value))
                : false
              }
            >
              Long break duration
              {' '}
              <span className="sr-only">in minutes</span>
            </NumberInput>

            <NumberInput
              defaultValue={longBreakGap}
              id="longBreakGap"
              max="99"
              min="1"
              placeholder="4"
              required={true}
              unit="focus intervals"
              onChange={(e) => e.target.checkValidity()
                ? updateSettingsFormValue('longBreakGap', parseInt(e.target.value))
                : false
              }
            >
                Focus intervals between long breaks
            </NumberInput>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className="sr-only">Focus intervals</legend>

            <Switch
              className={styles.fieldsetTop}
              defaultValue={isUseFocusIntervalsTarget}
              id="isUseFocusIntervalsTarget"
              onChange={(checked) => updateSettingsFormValue('isUseFocusIntervalsTarget', checked)}
            >
              <HuiSwitch.Label className={styles.legend}>Use a focus intervals target</HuiSwitch.Label>
            </Switch>

            <NumberInput
              defaultValue={focusIntervalsTarget}
              id="focusIntervalsTarget"
              max="99"
              min="1"
              placeholder="8"
              required={true}
              unit="intervals"
              onChange={(e) => e.target.checkValidity()
                ? updateSettingsFormValue('focusIntervalsTarget', parseInt(e.target.value))
                : false
              }
            >
                Focus intervals target
            </NumberInput>
          </fieldset>
        </form>
        
        <Footer formId={settingsFormId} />
      </section>

    </Dialog>
  );
};
