import { AnimatePresence } from 'framer-motion';
import React, { ReactElement, useRef } from 'react';
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
  ModalContent,
  ModalHeader,
  ModalSizes,
  ModalTitle,
  Underlay,
} from './Modal.styled';

type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps extends AriaModalOverlayProps {
  className?: string;
  title?: string;
  size?: ModalSize;
  children: ReactElement;
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

  const close = () => {
    state.close();
  };
  return (
    <AnimatePresence>
      {state.isOpen && (
        <OverlayContainer>
          {React.cloneElement(
            <Underlay {...underlayProps}>
              <ModalBg
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
              />
              <FocusScope contain restoreFocus autoFocus>
                <ModalContainer
                  {...modalProps}
                  css={[ModalSizes[size]]}
                  className={className}
                  ref={ref}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.9 }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                >
                  <ModalHeader>
                    {title !== undefined ? (
                      <ModalTitle>{title}</ModalTitle>
                    ) : null}
                    <CloseButton onClick={close}>
                      <CloseIcon />
                    </CloseButton>
                  </ModalHeader>
                  <ModalContent>
                    {React.cloneElement(children, {
                      close,
                    })}
                  </ModalContent>
                </ModalContainer>
              </FocusScope>
            </Underlay>,
            {
              onClose: () => state.close(),
            }
          )}
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
}
