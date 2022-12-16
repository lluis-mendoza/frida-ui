import React, { ReactNode, useRef } from 'react';
import {
  AriaModalOverlayProps,
  FocusScope,
  OverlayContainer,
  useModalOverlay,
} from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

import { ModalBg, ModalContainer, Underlay } from './Modal.styled';

interface ModalProps extends AriaModalOverlayProps {
  className?: string;
  children: ReactNode;
  state: OverlayTriggerState;
}
export function Modal({ state, children, className, ...props }: ModalProps) {
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  return (
    <>
      {state.isOpen && (
        <OverlayContainer>
          {React.cloneElement(
            <Underlay {...underlayProps}>
              <ModalBg />
              <FocusScope contain restoreFocus autoFocus>
                <ModalContainer {...modalProps} className={className} ref={ref}>
                  {children}
                </ModalContainer>
              </FocusScope>
            </Underlay>,
            {
              onClose: () => state.close(),
            }
          )}
        </OverlayContainer>
      )}
    </>
  );
}
