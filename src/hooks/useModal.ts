import {
  OverlayTriggerProps,
  OverlayTriggerState,
  useOverlayTriggerState,
} from 'react-stately';

export interface ModalStateProps extends OverlayTriggerProps {}
export interface ModalState extends OverlayTriggerState {}

export function useModal({ ...props }: ModalStateProps): ModalState {
  const state = useOverlayTriggerState(props);

  return state;
}
