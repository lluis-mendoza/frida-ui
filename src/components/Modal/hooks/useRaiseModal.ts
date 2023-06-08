import { useCallback, useState } from 'react';

import { ContextModalProps } from '../Modal.context';
import { RecursiveModal } from '../RecursiveModals';

export function useRaiseModal() {
  const [raisedModals, setRaisedModals] = useState<RecursiveModal[]>([]);
  const raiseModal = useCallback((modal: ContextModalProps) => {
    setRaisedModals((_modals) => {
      const removeModal = () => {
        setRaisedModals((_raisedModals) =>
          _raisedModals.slice(0, _modals.length)
        );
      };
      return [..._modals, { modal, removeModal }];
    });
  }, []);

  return { raisedModals, raiseModal };
}
