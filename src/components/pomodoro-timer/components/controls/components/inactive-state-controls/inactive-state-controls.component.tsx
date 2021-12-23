import { VoidFunctionComponent } from 'react';

import { useControlActionsContext } from '../../../../contexts';
import { ActionButtonComponentProps } from '../../controls.component';

export const InactiveStateControl: VoidFunctionComponent<ActionButtonComponentProps> = ({
  btnClasses = '',
}) => {
  const { controlActionReducer } = useControlActionsContext();

  return (
    <button
      className={`btn btn-primary ${btnClasses}`}
      type="button"
      onClick={() => controlActionReducer({ type: 'START' })}
    >
      Start
    </button>
  );
};
