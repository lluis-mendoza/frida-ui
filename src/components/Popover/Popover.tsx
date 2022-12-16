import { useRef } from 'react';
import {
  AriaPopoverProps,
  DismissButton,
  Overlay,
  usePopover,
} from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';

import { StyledPopover, Underlay } from './Popover.styled';

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
  width?: number;
}

export function Popover({ width, ...props }: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverRef = ref, state, children, className, isNonModal } = props;

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      {!(isNonModal ?? false) && <Underlay {...underlayProps} />}
      <StyledPopover
        {...popoverProps}
        ref={popoverRef}
        width={width}
        className={className}
      >
        {!(isNonModal ?? false) && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </StyledPopover>
    </Overlay>
  );
}
