import { ForwardedRef, forwardRef } from 'react';
import {
  MdOutlineAssignment,
  MdOutlineAssignmentTurnedIn,
} from 'react-icons/md';
import { useTooltipTriggerState } from 'react-stately';

import { FieldButton, FieldIconSizes } from '../../styled-components';
import { Tooltip } from '../Tooltip';
import { BaseInput, InputProps } from './BaseInput';

export interface CopyProps extends InputProps {}

export const Copy = forwardRef(function Copy(
  props: CopyProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { size = 'md' } = props;
  const tooltipProps = {
    delay: 100,
    closeDelay: 100,
  };
  const tooltipState = useTooltipTriggerState(tooltipProps);
  const handleClick = () => {
    tooltipState.open();
    void navigator.clipboard.writeText(props.value ?? '');
  };
  const handleBlur = () => tooltipState.close();
  return (
    <BaseInput
      {...props}
      ref={ref}
      sufix={
        <div tw="relative flex items-center">
          <FieldButton type="button" onClick={handleClick} onBlur={handleBlur}>
            {!tooltipState.isOpen ? (
              <MdOutlineAssignment css={FieldIconSizes[size]} />
            ) : (
              <MdOutlineAssignmentTurnedIn css={FieldIconSizes[size]} />
            )}
          </FieldButton>
          {tooltipState.isOpen && (
            <Tooltip state={tooltipState}>Copiado!</Tooltip>
          )}
        </div>
      }
    />
  );
});
