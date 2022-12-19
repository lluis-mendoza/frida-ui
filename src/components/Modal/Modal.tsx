import React, { ReactNode, useRef } from 'react';
import {
  AriaModalOverlayProps,
  FocusScope,
  OverlayContainer,
  useModalOverlay,
} from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

import {
  CloseButton,
  CloseIcon,
  ModalBg,
  ModalContainer,
  ModalHeader,
  ModalSizes,
  ModalTitle,
  Underlay,
} from './Modal.styled';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps extends AriaModalOverlayProps {
  className?: string;
  title?: string;
  size?: ModalSize;
  children: ReactNode;
  state: OverlayTriggerState;
}
export function Modal({
  state,
  children,
  className,
  title,
  size = 'md',
  ...props
}: ModalProps) {
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
                <ModalContainer
                  {...modalProps}
                  css={[ModalSizes[size]]}
                  className={className}
                  ref={ref}
                >
                  <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <CloseButton onClick={() => state.close()}>
                      <CloseIcon />
                    </CloseButton>
                  </ModalHeader>
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
