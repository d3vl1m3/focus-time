import { useControlActionsContext } from '@contexts';
import { VoidFunctionComponent } from 'react';

import type { ActionButtonComponentProps } from '../../controls.component';

export const InactiveStateControls: VoidFunctionComponent<ActionButtonComponentProps> = ({
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
