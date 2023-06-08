import { Fragment, useEffect } from 'react';

import { useModal } from './hooks';
import { Modal, ModalProps } from './Modal';

export interface RecursiveModal {
  modal: Omit<ModalProps, 'state'>;
  removeModal: () => void;
}
interface RecursiveModalProps {
  modals: RecursiveModal[];
}
export function RecursiveModals({ modals }: RecursiveModalProps) {
  const state = useModal({ defaultOpen: true });
  console.log(state);
  const { modal, removeModal } = modals[0];

  useEffect(() => {
    if (!state.isOpen) {
      const timer = setTimeout(removeModal, 200);
      return () => clearTimeout(timer);
    }
  }, [removeModal, state.isOpen]);

  return (
    <Fragment>
      <Modal state={state} {...modal} />;
      {modals.length > 1 ? <RecursiveModals modals={modals.slice(1)} /> : null}
    </Fragment>
  );
}
