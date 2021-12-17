import {VoidFunctionComponent} from 'react';
import {useControlActionsContext} from '../../../../contexts';

interface CompletedStateControlsProps {
  btnClasses?: string
}

export const CompletedStateControls: VoidFunctionComponent<CompletedStateControlsProps> = ({btnClasses = ''}) => {
  const {controlActionReducer} = useControlActionsContext();
  return (
    <button
      className={`btn btn-primary ${btnClasses}`}
      type="button"
      onClick={() => controlActionReducer({type: 'RESET'})}
    >
      Reset
    </button>
  );
};
