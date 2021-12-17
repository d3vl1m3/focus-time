import {VoidFunctionComponent} from 'react';
import {useControlActionsContext} from '../../../../contexts';

interface InactiveStateControlProps {
  btnClasses?: string
}

export const InactiveStateControl: VoidFunctionComponent<InactiveStateControlProps> = ({btnClasses = ''}) => {
  const {controlActionReducer} = useControlActionsContext();
  return (
    <button
      className={`btn btn-primary ${btnClasses}`}
      type="button"
      onClick={() => controlActionReducer({type: 'START'})}
    >
      Start
    </button>
  );
};
