import { createContext, useContext, useEffect, useState } from 'react';

import { useModal } from './hooks';
import { Modal, ModalProps } from './Modal';

interface IProps {
  children: JSX.Element | JSX.Element[];
}
interface QueueModalProps extends Omit<ModalProps, 'state'> {}

export interface IModalContext {
  raiseModal: (modalProps: QueueModalProps) => void;
}
export const ModalContextEmptyState: IModalContext = {
  raiseModal: () => undefined,
};
const ModalContext = createContext<IModalContext>(ModalContextEmptyState);

export const ModalProvider = ({ children }: IProps) => {
  const state = useModal({});
  const [modals, setModals] = useState<QueueModalProps[]>([]);
  const [currentModal, setCurrentModal] = useState<QueueModalProps | null>(
    null
  );
  useEffect(() => {
    if (currentModal === null && modals.length > 0) {
      const timer = setTimeout(() => {
        setModals((_modals) => {
          const _modalsCopy = _modals;
          const _modal = _modalsCopy.shift();
          if (_modal !== undefined) setCurrentModal(_modal);
          return _modalsCopy;
        });
        state.open();
      }, 200);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [currentModal, modals.length, state]);

  useEffect(() => {
    if (!state.isOpen) {
      setCurrentModal(null);
    }
  }, [state]);

  const raiseModal = (_modal: QueueModalProps) => {
    setModals((_modals) => [..._modals, _modal]);
  };

  return (
    <ModalContext.Provider value={{ raiseModal }}>
      {currentModal !== null && <Modal state={state} {...currentModal} />}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('ModalContext must be used within a ModalProvider');
  }
  return context;
};
