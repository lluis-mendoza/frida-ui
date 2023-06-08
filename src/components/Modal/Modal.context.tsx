import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRaiseModal } from './hooks';
import { ModalProps } from './Modal';
import { RecursiveModals } from './RecursiveModals';

interface IProps {
  children: JSX.Element | JSX.Element[];
}
export type ContextModalProps = Omit<ModalProps, 'state'>;

export interface IModalContext {
  raiseModal: (modalProps: ContextModalProps) => void;
  enqueueModal: (modalProps: ContextModalProps) => void;
}
export const ModalContextEmptyState: IModalContext = {
  raiseModal: () => undefined,
  enqueueModal: () => undefined,
};
const ModalContext = createContext<IModalContext>(ModalContextEmptyState);

export const ModalProvider = ({ children }: IProps) => {
  const { raisedModals, raiseModal } = useRaiseModal();
  const [queuedModals, setQueuedModals] = useState<ContextModalProps[]>([]);

  useEffect(() => {
    if (raisedModals.length === 0 && queuedModals.length > 0) {
      const queuedModal = queuedModals[0];
      const timer = setTimeout(() => {
        raiseModal(queuedModal);
        setQueuedModals((_queuedModals) => _queuedModals.slice(1));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [queuedModals, raiseModal, raisedModals]);

  const enqueueModal = useCallback((_modal: ContextModalProps) => {
    setQueuedModals((_modals) => [..._modals, _modal]);
  }, []);
  return (
    <ModalContext.Provider value={{ raiseModal, enqueueModal }}>
      {raisedModals.length > 0 ? (
        <RecursiveModals modals={raisedModals} />
      ) : null}
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
