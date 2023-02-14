import {
  OverlayTriggerProps,
  OverlayTriggerState,
  useOverlayTriggerState,
} from 'react-stately';

interface ModalStateProps extends OverlayTriggerProps {}
export interface ModalState extends OverlayTriggerState {}

export function useModal(props?: ModalStateProps): ModalState {
  const _props = props ?? {};
  const state = useOverlayTriggerState(_props);

  return state;
}
